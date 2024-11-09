// client/src/hooks/chat/useChat.tsx
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
  let typingTimeout: NodeJS.Timeout | null = null;

  // Fetch chat messages
  const { messages } = useGetChatMessages(chatId);

  // Mutation for sending messages
  const { mutateAsync: createMessage } = useMutation({
    mutationFn: ({ chatId, data }: { chatId: string; data: TCreateMessage }) =>
      CHAT_API.CREATE_MESSAGE(chatId, data),
    mutationKey: [CHAT_API.CREATE_MESSAGE.name],
  });

  const sendMessage = async (data: TCreateMessage) => {
    if (!socket || !isConnected) throw new Error('Not connected');
    await createMessage({ chatId, data });
    socket.emit(ChatEvent.NEW_MESSAGE, { chatId, content: data.content });
  };

  const handleTyping = (isTyping: boolean) => {
    if (!socket || !isConnected) {
      console.warn('Socket is not connected');
      return;
    }
  
    // console.log('Emitting typing event:', { chatId, isTyping });
    socket.emit(ChatEvent.TYPING, { chatId, isTyping });
  };

  const manageTyping = () => {
    console.log('Managing typing event...')
    setIsTyping(true);
    handleTyping(true);
    if (typingTimeout) clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      setIsTyping(false);
      handleTyping(false);
    }, 1000);
  };

  const joinChat = () => {
    if (socket && isConnected) {
      socket.emit(ChatEvent.JOIN, chatId);
    }
  };

  useEffect(() => {
    if (!socket || !chatId || !currentOrganizationId) return;
    joinChat();

    socket.on(ChatEvent.NEW_MESSAGE, (message: IMessage) => {
      queryClient.setQueryData(
        [CHAT_API.GET_CHAT_MESSAGES.name, chatId],
        (old: IMessage[] | []) => {
          return  old.map((msg) => {
            if (msg._id === message._id) {
              return message;
            }
            return msg;
          })
        }
      );
    });

    socket.on(ChatEvent.TYPING, ({ userId, isTyping }) => {
      setIsTyping(isTyping);
    });

    return () => {
      socket.off(ChatEvent.NEW_MESSAGE);
      socket.off(ChatEvent.TYPING);
      if (typingTimeout) clearTimeout(typingTimeout);
    };
  }, [socket, chatId, currentOrganizationId]);

  return {
    messages,
    sendMessage,
    handleTyping,
    isTyping,
    manageTyping,
  };
}
