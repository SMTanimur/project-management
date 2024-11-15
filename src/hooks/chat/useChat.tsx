'use client';

import { useSocket } from '@/app/provider/socketContext';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { CHAT_API } from '@/services';
import { TCreateMessage } from '@/validations';
import { ChatEvent, IMessage, IUser } from '@/types';
import { useChatStore, useGlobalLocalStateStore } from '@/store';
import { useUser } from '../useUser';

export function useChat(chatId: string) {
  const { currentOrganizationId } = useGlobalLocalStateStore();
  const { socket, isConnected } = useSocket();
  const { data: user } = useUser();
  const { messages, setMessages, addMessage, isTyping, setIsTyping, fetchMessages, isLoading } = useChatStore();
  const [senderId, setSenderId] = useState<string>('');
  let typingTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (chatId) {
      fetchMessages(chatId);
    }
  }, [chatId, fetchMessages]);

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

    // Emit a message event to update other clients in real-time
    socket.emit(ChatEvent.NEW_MESSAGE, newMessage);
  };

  // Handle typing event
  const handleTyping = (isTyping: boolean, sendTo: string) => {
    if (!socket || !isConnected) {
      console.warn('Socket is not connected');
      return;
    }
    socket.emit(ChatEvent.TYPING, { chatId, isTyping, sendTo });
  };

  // Manage typing timeout and emit typing event
  const manageTyping = () => {
    handleTyping(true, senderId);
    if (typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      handleTyping(false, senderId);
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

    // Listen for new messages and update the messages in state
    socket.on(ChatEvent.NEW_MESSAGE, (message: IMessage) => {
      addMessage(message);
    });

    // Listen for typing events and update the typing state
    socket.on(ChatEvent.TYPING, ({ userId, isTyping, sendTo }) => {
      console.log({ userId, isTyping });
      setSenderId(sendTo);
      if (userId !== user?._id) return;
      setIsTyping(isTyping);
    });

    // Clean up socket event listeners when the component unmounts
    return () => {
      socket.off(ChatEvent.NEW_MESSAGE);
      socket.off(ChatEvent.TYPING);
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [socket, chatId, currentOrganizationId, user?._id, addMessage, setIsTyping]);

  return {
    messages,
    senderId,
    sendMessage,
    handleTyping,
    isTyping,
    manageTyping,
    isLoading,
  };
}