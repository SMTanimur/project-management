"use client"

import { useSocket } from '@/app/provider/socketContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface Message {
  id: string;
  content: string;
  sender: any;
  createdAt: Date;
}

interface ChatRoom {
  id: string;
  name: string;
  messages: Message[];
}

export function useChat(chatId: string) {
  const { socket, isConnected } = useSocket();
  const queryClient = useQueryClient();
  const [isTyping, setIsTyping] = useState(false);

  // Query for fetching messages
  const { data: messages, isLoading } = useQuery<Message[]>({
    queryKey: ['chat-messages', chatId],
    queryFn: async () => {
      const response = await fetch(`/api/chats/${chatId}/messages`);
      return response.json();
    },
    enabled: !!chatId,
  });

  // Mutation for sending messages
  const sendMessage = useMutation({
    mutationFn: async (content: string) => {
      if (!socket || !isConnected) throw new Error('Not connected');

      return new Promise((resolve, reject) => {
        socket.emit('message', { chatId, content }, (response: any) => {
          if (response.error) reject(response.error);
          else resolve(response);
        });
      });
    },
    onSuccess: (newMessage) => {
      queryClient.setQueryData(['chat-messages', chatId], (old: Message[] = []) => [
        ...old,
        newMessage,
      ]);
    },
  });

  // Handle typing indicator
  const handleTyping = (isTyping: boolean) => {
    if (!socket || !isConnected) return;
    socket.emit('typing', { chatId, isTyping });
  };

  // Join chat room
  const joinChat = async () => {
    if (!socket || !isConnected) return;
    socket.emit('joinChat', chatId);
  };

  // Set up socket listeners
  useEffect(() => {
    if (!socket || !chatId) return;

    // Join the chat room
    joinChat();

    // Listen for new messages
    socket.on('newMessage', (message: Message) => {
      queryClient.setQueryData(['chat-messages', chatId], (old: Message[] = []) => [
        ...old,
        message,
      ]);
    });

    // Listen for typing indicators
    socket.on('userTyping', ({ userId, isTyping }) => {
      setIsTyping(isTyping);
    });

    return () => {
      socket.off('newMessage');
      socket.off('userTyping');
    };
  }, [socket, chatId]);

  return {
    messages,
    isLoading,
    sendMessage,
    handleTyping,
    isTyping,
  };
}