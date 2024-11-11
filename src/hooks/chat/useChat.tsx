// client/src/hooks/chat/useChat.tsx
'use client';

import { useSocket } from '@/app/provider/socketContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useGetChatMessages } from './useGetChats';
import { CHAT_API } from '@/services';
import { TCreateMessage } from '@/validations';
import { ChatEvent, IMessage } from '@/types';
import { useGlobalLocalStateStore } from '@/store';
import { useUser } from '../useUser';

export function useChat(chatId: string) {
  const { currentOrganizationId } = useGlobalLocalStateStore();
  const { socket, isConnected } = useSocket();
  const [senderId, setSenderId] = useState<string>('');
  const queryClient = useQueryClient();
  const [isTyping, setIsTyping] = useState(false);
  const { data: user } = useUser();
  let typingTimeout: NodeJS.Timeout | null = null;

  // Fetch chat messages
  const {
    messages: initialMessages = [],
    refetch,
    isLoading,
  } = useGetChatMessages(chatId);

  const [messages, setMessages] = useState<IMessage[]>(initialMessages);

  // Mutation for sending messages
  const { mutateAsync: createMessage } = useMutation({
    mutationFn: ({ chatId, data }: { chatId: string; data: TCreateMessage }) =>
      CHAT_API.CREATE_MESSAGE(chatId, data),
    mutationKey: [CHAT_API.CREATE_MESSAGE.name],
  });

  // Optimistic UI for sending a new message
  const sendMessage = async (data: TCreateMessage) => {
    if (!socket || !isConnected) throw new Error('Not connected');

    // Optimistically update the chat messages before the server response
    queryClient.setQueryData(
      [CHAT_API.GET_CHAT_MESSAGES.name, chatId],
      (oldMessages: IMessage[] = []) => [
        ...oldMessages,
        {
          _id: 'optimistic-message',
          content: data.content,
          sender: user,
          createdAt: new Date().toISOString(),
        },
      ]
    );

    // Make the API call to create the message
    await createMessage({ chatId, data });

    // Emit a message event to update other clients in real-time
    socket.emit(ChatEvent.NEW_MESSAGE, { chatId, content: data.content });
  };

  // Handle typing event
  const handleTyping = (isTyping: boolean) => {
    if (!socket || !isConnected) {
      console.warn('Socket is not connected');
      return;
    }
    socket.emit(ChatEvent.TYPING, { chatId, isTyping });
  };

  // Manage typing timeout and emit typing event
  const manageTyping = () => {
    handleTyping(true);
    if (typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      handleTyping(false);
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

    // Listen for new messages and update the messages in cache
    socket.on(ChatEvent.NEW_MESSAGE, (message: IMessage) => {
      queryClient.setQueryData(
        [CHAT_API.GET_CHAT_MESSAGES.name, chatId],
        (oldMessages: IMessage[] = []) => {
          return [...oldMessages, message]; // Append the new message
        }
      );
    });

    // Listen for typing events and update the typing state
    socket.on(ChatEvent.TYPING, ({ userId, isTyping }) => {
      console.log({ userId, isTyping });
      setSenderId(userId);
      if (userId !== user?._id) return;
      setIsTyping(isTyping);
    });

    // Clean up socket event listeners when the component unmounts
    return () => {
      socket.off(ChatEvent.NEW_MESSAGE);
      socket.off(ChatEvent.TYPING);
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [socket, chatId, currentOrganizationId, user?._id]);

  return {
    messages,
    senderId,
    sendMessage,
    handleTyping,
    isTyping,
    manageTyping,
  };
}
