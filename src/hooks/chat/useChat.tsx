'use client';

import { useSocket } from '@/app/provider/socketContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState, useCallback, useRef } from 'react';
import { CHAT_API } from '@/services';
import { TCreateMessage } from '@/validations';
import { ChatEvent, ChatType, IMessage, IUser } from '@/types';
import { useChatStore, useGlobalLocalStateStore } from '@/store';
import { useUser } from '../useUser';

export function useChat(chatId: string) {
  const { currentOrganizationId } = useGlobalLocalStateStore();
  const { isTyping, setIsTyping } = useChatStore();
  const { socket, isConnected } = useSocket();
  const { data: user } = useUser();
  const queryClient = useQueryClient();
  const [typingUsers, setTypingUsers] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [lastTypingTime, setLastTypingTime] = useState<{
    [key: string]: number;
  }>({});
  const typingTimeoutRef = useRef<{ [key: string]: NodeJS.Timeout }>({});
  const hasPlayedSoundRef = useRef<{ [key: string]: boolean }>({});

  // Get chat details to check if it's a direct chat
  const { data: chat } = useQuery({
    queryKey: [CHAT_API.GET_CHAT_BY_ID.name, chatId],
    queryFn: () => CHAT_API.GET_CHAT_BY_ID(chatId),
    enabled: !!chatId,
  });

  const isDirectChat = chat?.type === ChatType.DIRECT;

  // Mutation for sending messages
  const { mutateAsync: createMessage } = useMutation({
    mutationFn: ({ chatId, data }: { chatId: string; data: TCreateMessage }) =>
      CHAT_API.CREATE_MESSAGE(chatId, data),
    mutationKey: [CHAT_API.CREATE_MESSAGE.name],
  });

  // Play typing sound
  const playTypingSound = useCallback(() => {
    const audio = new Audio('/sounds/typing-sound.mp3');
    audio.volume = 0.5;
    audio
      .play()
      .catch(error => console.error('Error playing typing sound:', error));
  }, []);

  // Play message received sound
  const playMessageSound = useCallback(() => {
    const audio = new Audio('/sounds/message-received.mp3');
    audio.volume = 0.3;
    audio
      .play()
      .catch(error => console.error('Error playing message sound:', error));
  }, []);

  // Handle typing event
  const handleTyping = useCallback(
    (isTyping: boolean) => {
      if (!socket || !isConnected || !user?._id || !isDirectChat) return;

      socket.emit(ChatEvent.TYPING, {
        chatId,
        isTyping,
        userId: user._id,
        timestamp: Date.now(),
      });
    },
    [socket, isConnected, user?._id, chatId, isDirectChat]
  );

  // Send a new message
  const sendMessage = async (data: TCreateMessage) => {
    if (!socket || !isConnected) throw new Error('Not connected');

    try {
      const newMessage = await createMessage({ chatId, data });

      // Emit the message through socket for real-time delivery
      socket.emit(ChatEvent.NEW_MESSAGE, {
        chatId,
        message: newMessage,
      });

      // Clear typing state after sending message
      handleTyping(false);

      // Reset typing sound flags for all users when a message is sent
      hasPlayedSoundRef.current = {};

      return newMessage;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  };

  // Manage typing timeout
  const manageTyping = useCallback(() => {
    if (!user?._id) return;

    handleTyping(true);

    // Clear existing timeout
    if (typingTimeoutRef.current[user._id]) {
      clearTimeout(typingTimeoutRef.current[user._id]);
    }

    // Set new timeout
    typingTimeoutRef.current[user._id] = setTimeout(() => {
      handleTyping(false);
      // Reset typing sound flag when typing stops
      if (hasPlayedSoundRef.current[user._id]) {
        hasPlayedSoundRef.current[user._id] = false;
      }
    }, 2000);
  }, [handleTyping, user?._id]);

  useEffect(() => {
    if (!socket || !chatId || !isDirectChat) return;

    // Join chat room
    socket.emit(ChatEvent.JOIN, chatId);

    // Handle typing events
    const onTyping = ({ userId, isTyping, timestamp }: any) => {
      if (userId === user?._id) return;

      setTypingUsers(prev => ({ ...prev, [userId]: isTyping }));
      setLastTypingTime(prev => ({ ...prev, [userId]: timestamp }));

      // Play sound only if user just started typing and sound hasn't been played yet
      if (isTyping && isDirectChat && !hasPlayedSoundRef.current[userId]) {
        playTypingSound();
        hasPlayedSoundRef.current[userId] = true;
      }

      // Reset sound flag if user stops typing
      if (!isTyping) {
        hasPlayedSoundRef.current[userId] = false;
      }
    };

    // Handle new messages
    const onNewMessage = (message: IMessage) => {
      if (message.sender._id !== user?._id && isDirectChat) {
        playMessageSound();
        // Reset typing sound flag for the sender
        hasPlayedSoundRef.current[message.sender._id] = false;
      }

      queryClient.setQueryData(
        [CHAT_API.GET_CHAT_MESSAGES.name, chatId],
        (old: any) => ({
          ...old,
          data: [...(old?.data || []), message],
        })
      );
    };

    socket.on(ChatEvent.TYPING, onTyping);
    socket.on(ChatEvent.NEW_MESSAGE, onNewMessage);

    return () => {
      socket.off(ChatEvent.TYPING, onTyping);
      socket.off(ChatEvent.NEW_MESSAGE, onNewMessage);

      // Clear all typing timeouts
      Object.values(typingTimeoutRef.current).forEach(timeout =>
        clearTimeout(timeout)
      );
      // Reset all sound flags
      hasPlayedSoundRef.current = {};
    };
  }, [
    socket,
    chatId,
    user?._id,
    queryClient,
    isDirectChat,
    playTypingSound,
    playMessageSound,
  ]);

  return {
    sendMessage,
    handleTyping,
    manageTyping,
    isTyping: Object.values(typingUsers).some(Boolean),
    typingUsers,
  };
}
