'use client';

import { useSocket } from '@/app/provider/socketContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { CHAT_API } from '@/services';
import { TCreateMessage } from '@/validations';
import { ChatEvent, IMessage, IUser } from '@/types';
import { useChatStore, useGlobalLocalStateStore } from '@/store';
import { useUser } from '../useUser';
import { isArray } from 'lodash';

export function useChat(chatId: string) {
  const { currentOrganizationId } = useGlobalLocalStateStore();
  const {isTyping,setIsTyping,isOnType}=useChatStore()
  const { socket, isConnected } = useSocket();
  const { data: user } = useUser();
  const queryClient = useQueryClient();
  const [senderId, setSenderId] = useState<string>('');
  const [sendToId, setSendTo] = useState<string>('');
  const [isMeTyping, setIsMeTyping] = useState<string>('');
  let typingTimeout: NodeJS.Timeout | null = null;

  // Mutation for sending messages
  const { mutateAsync: createMessage } = useMutation({
    mutationFn: ({ chatId, data }: { chatId: string; data: TCreateMessage }) =>
      CHAT_API.CREATE_MESSAGE(chatId, data),
    mutationKey: [CHAT_API.CREATE_MESSAGE.name],
  });

  // Send a new message
  const sendMessage = async (data: TCreateMessage) => {
    if (!socket || !isConnected) throw new Error('Not connected');

    // Make the API call to create the message
    const newMessage = await createMessage({ chatId, data });
  };

  const playTypingSound = () => {
    const audio = new Audio('/sounds/typing-sound.mp3');
    audio
      .play()
      .catch(error => console.error('Error playing typing sound:', error));
  };

  // Handle typing event
  const handleTyping = (
    isTyping: boolean,
    sendTo: string,
    senderId: string
  ) => {
    if (!socket || !isConnected) {
      console.warn('Socket is not connected');
      return;
    }
    socket.emit(ChatEvent.TYPING, { chatId, isTyping, sendTo, senderId });
  };

  // Manage typing timeout and emit typing event
  const manageTyping = () => {
    handleTyping(true, sendToId, senderId);
    if (typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      handleTyping(false, sendToId, senderId);
    }, 1000);
  };

  // Join the chat when the component mounts
  const joinChat = () => {
    if (socket && isConnected) {
      socket.emit(ChatEvent.JOIN, chatId);
    }
  };

  // Set up WebSocket listeners for real-time updates
  useEffect(() => {
    if (!socket || !chatId || !currentOrganizationId) return;

    joinChat();

    const handleNewMessage = (message: IMessage) => {
      queryClient.setQueryData(
        [CHAT_API.GET_CHAT_MESSAGES.name, chatId],
        ({ data }: { data: IMessage[] }) => {
          return { data: [...data, message] };
        }
      );
    };

    const handleTypingEvent = ({
      userId,
      isTyping,
      sendTo,
      senderId,
      isMeTyping,
    }: any) => {
      console.log({ userId, isTyping, sendTo, senderId, isMeTyping });
      setSendTo(sendTo);
      setIsTyping(isTyping);
      setSenderId(senderId);
      setIsMeTyping(isMeTyping);
      
      // Play typing sound only if the sender is typing and is a hiring user
      if (isTyping && senderId && user?.role === 'hiring') {
        playTypingSound();
      }
    };

    // Listen for new messages and update the messages in state
    socket.on(ChatEvent.NEW_MESSAGE, handleNewMessage);

    // Listen for typing events and update the typing state
    socket.on(ChatEvent.TYPING, handleTypingEvent);

    // Clean up socket event listeners when the component unmounts
    return () => {
      socket.off(ChatEvent.NEW_MESSAGE, handleNewMessage);
      socket.off(ChatEvent.TYPING, handleTypingEvent);
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [socket, chatId, currentOrganizationId, user?._id, queryClient]);

  return {
    senderId,
    sendToId,
    isMeTyping,
    sendMessage,
    handleTyping,
    isTyping,
    manageTyping,
  };
}
