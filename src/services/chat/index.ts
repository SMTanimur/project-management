import { api } from '@/api';
import { API_PATHS } from '@/lib';
import { IChat, IMessage, IPagination, STATUS } from '@/types';
import { TCreateChat, TCreateMessage, TUpdateChat } from '@/validations';

export const CHAT_API = {
  GET_USER_CHATS: async (organizationId: string) => {
    const response = await api.get(`${API_PATHS.CHAT}/${organizationId}`);
    return response.data;
  },

  CREATE_CHAT: async (data: TCreateChat): Promise<{ message: string }> => {
    const response = await api.post(API_PATHS.CHAT, data);
    return response.data;
  },

  // Get a chat by ID
  GET_CHAT_BY_ID: async (chatId: string): Promise<IChat> => {
    const response = await api.get(`${API_PATHS.CHAT}/${chatId}/single`);
    return response.data;
  },

  // Update a chat
  UPDATE_CHAT: async (chatId: string, data: TUpdateChat) => {
    const response = await api.put(`${API_PATHS.CHAT}/${chatId}`, data);
    return response.data;
  },

  // Delete a chat
  DELETE_CHAT: async (chatId: string) => {
    const response = await api.delete(`${API_PATHS.CHAT}/${chatId}`);
    return response.data;
  },

  // Search for groups or members
  SEARCH_GROUPS_OR_MEMBERS: async (organizationId: string, query: string) => {
    const response = await api.get(
      `${API_PATHS.CHAT}/${organizationId}/searchGroupsOrMembers`,
      {
        params: { q: query },
      }
    );
    return response.data;
  },

  // Get messages of a chat
  GET_CHAT_MESSAGES: async (
    chatId: string,
    query = {}
  ): Promise<IPagination<IMessage>> => {
    const response = await api.get(`${API_PATHS.CHAT}/${chatId}/messages`, {
      params: query,
    });
    return response.data;
  },

  // Create a new message in a chat
  CREATE_MESSAGE: async (
    chatId: string,
    data: TCreateMessage
  ): Promise<{ newMessage: IMessage }> => {
    const response = await api.post(
      `${API_PATHS.CHAT}/${chatId}/messages`,
      data
    );
    return response.data;
  },

  // Update a message in a chat
  UPDATE_MESSAGE: async (
    chatId: string,
    messageId: string,
    data: TCreateMessage
  ) => {
    const response = await api.put(
      `${API_PATHS.CHAT}/${chatId}/messages/${messageId}`,
      data
    );
    return response.data;
  },

  UPDATE_USER_STATUS: async (data: {
    userId: string;
    status: STATUS;
    lastSeen: Date;
  }) => {
    const response = await api.post('v1/users/status', data);
    return response.data;
  },

  // Delete a message in a chat
  DELETE_MESSAGE: async (chatId: string, messageId: string) => {
    const response = await api.delete(
      `${API_PATHS.CHAT}/${chatId}/messages/${messageId}`
    );
    return response.data;
  },

  // Validate a chat member
  VALIDATE_MEMBER: async (chatId: string) => {
    const response = await api.get(
      `${API_PATHS.CHAT}/${chatId}/validateMember`
    );
    return response.data;
  },

  // Add members to a chat
  ADD_MEMBERS: async (chatId: string, data: any) => {
    const response = await api.post(
      `${API_PATHS.CHAT}/${chatId}/members`,
      data
    );
    return response.data;
  },

  // Remove a member from a chat
  REMOVE_MEMBER: async (chatId: string, userId: string) => {
    const response = await api.delete(
      `${API_PATHS.CHAT}/${chatId}/members/${userId}`
    );
    return response.data;
  },
};
