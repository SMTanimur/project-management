import {create} from 'zustand';
import { IMessage } from '@/types';
import { CHAT_API } from '@/services';

interface ChatState {
  messages: IMessage[];
  isLoading: boolean;
  isError: boolean;
  isOnType: boolean;
  fetchMessages: (chatId: string) => Promise<void>;
  setMessages: (messages: IMessage[]) => void;
  addMessage: (message: IMessage) => void;
  isTyping: boolean;
  setIsTyping: (isTyping: boolean) => void;
  setIsOnType: (isOnType: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  isOnType:false,
  isError: false,
  fetchMessages: async (chatId: string) => {
    set({ isLoading: true, isError: false });
    try {
      const response = await CHAT_API.GET_CHAT_MESSAGES(chatId);
      set({ messages: response.data, isLoading: false });
    } catch (error) {
      set({ isError: true, isLoading: false });
    }
  },
  setIsOnType:(isOnType)=>set({isOnType}),
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  isTyping: false,
  setIsTyping: (isTyping) => set({ isTyping }),
}));