// useChat.ts
'use client';

import { useSocket } from '@/app/provider/socketContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useGetChatMessages } from './useGetChats';
import { CHAT_API } from '@/services';
import { TCreateMessage } from '@/validations';
import { ChatEvent, IMessage } from '@/types';
import { useGlobalLocalStateStore } from '@/store';

export function useChat(chatId: string) {
  const { currentOrganizationId } = useGlobalLocalStateStore();
  const { socket, isConnected } = useSocket();
  const queryClient = useQueryClient();
  const [isTyping, setIsTyping] = useState(false);

  // Query for fetching messages
  const { messages } = useGetChatMessages(chatId);

  // Mutation for sending messages
  const { mutateAsync: createMessageMutateAsync } = useMutation({
    mutationFn: ({ chatId, data }: { chatId: string; data: TCreateMessage }) => CHAT_API.CREATE_MESSAGE(chatId, data),
    mutationKey: [CHAT_API.CREATE_MESSAGE.name],
  });

  const sendMessage = async (data: TCreateMessage) => {
    if (!socket || !isConnected) throw new Error('Not connected');

 
    await createMessageMutateAsync({ chatId, data });

    // Emit the message to the server
    socket.emit('message', { chatId, content: data.content });
  };

  // Handle typing indicator
  const handleTyping = (isTyping: boolean) => {
    if (!socket || !isConnected) return;
    socket.emit(ChatEvent.TYPING, { chatId, isTyping });
  };

  // Join chat room
  const joinChat = () => {
    if (!socket || !isConnected) return;
    socket.emit('joinChat', { chatId, currentOrganizationId });
  };

  // Set up socket listeners
  useEffect(() => {
    if (!socket || !chatId || !currentOrganizationId) return;

    joinChat();

    // Listen for new messages
    socket.on('newMessage', (message: IMessage) => {
      queryClient.setQueryData([CHAT_API.GET_CHAT_MESSAGES.name, chatId], (old: IMessage[] | undefined) => {
        return [...(old || []), message];
      });
    });

    // Listen for typing indicators
    socket.on(ChatEvent.TYPING, ({ userId, isTyping }) => {
      setIsTyping(isTyping);
    });

    return () => {
      socket.off('newMessage');
      socket.off(ChatEvent.TYPING);
    };
  }, [socket, chatId, currentOrganizationId]);

  return {
    messages,
    sendMessage,
    handleTyping,
    isTyping,
  };
}