import { api } from "@/api";
import { API_PATHS } from "@/lib";
import { IChat, IMessage, IPagination } from "@/types";
import { TCreateChat, TCreateMessage, TUpdateChat } from "@/validations";


export const CHAT_API ={
  GET_USER_CHATS: async (organizationId:string) => {
    return await api.get(`${API_PATHS.CHAT}/${organizationId}`);
  },

   CREATE_CHAT: async (data:TCreateChat):Promise<{message:string}> => {
    return await api.post(API_PATHS.CHAT, data);
  },

  // Get a chat by ID
  GET_CHAT_BY_ID: async (chatId: string):Promise<IChat> => {
    return await api.get(`${API_PATHS.CHAT}/${chatId}/single`);
  },

  // Update a chat
  UPDATE_CHAT: async (chatId: string, data: TUpdateChat) => {
    return await api.put(`${API_PATHS.CHAT}/${chatId}`, data);
  },

  // Delete a chat
  DELETE_CHAT: async (chatId: string) => {
    return await api.delete(`${API_PATHS.CHAT}/${chatId}`);
  },

  // Search for groups or members
  SEARCH_GROUPS_OR_MEMBERS: async (organizationId: string, query: string) => {
    return await api.get(`${API_PATHS.CHAT}/${organizationId}/searchGroupsOrMembers`, {
      params: { q: query },
    });
  },

  // Get messages of a chat
  GET_CHAT_MESSAGES: async (chatId: string, query = {}):Promise<IPagination<IMessage>> => {
    return await api.get(`${API_PATHS.CHAT}/${chatId}/messages`, { params: query });
  },

  // Create a new message in a chat
  CREATE_MESSAGE: async (chatId: string, data: TCreateMessage):Promise<{newMessage:IMessage}> => {
   
    return await api.post(`${API_PATHS.CHAT}/${chatId}/messages`,data);
  },

  // Update a message in a chat
  UPDATE_MESSAGE: async (chatId: string, messageId: string, data: TCreateMessage) => {
    return await api.put(`${API_PATHS.CHAT}/${chatId}/messages/${messageId}`, data);
  },

  // Delete a message in a chat
  DELETE_MESSAGE: async (chatId: string, messageId: string) => {
    return await api.delete(`${API_PATHS.CHAT}/${chatId}/messages/${messageId}`);
  },

  // Validate a chat member
  VALIDATE_MEMBER: async (chatId: string) => {
    return await api.get(`${API_PATHS.CHAT}/${chatId}/validateMember`);
  },

  // Add members to a chat
  ADD_MEMBERS: async (chatId: string, data: any) => {
    return await api.post(`${API_PATHS.CHAT}/${chatId}/members`, data);
  },

  // Remove a member from a chat
  REMOVE_MEMBER: async (chatId: string, userId: string) => {
    return await api.delete(`${API_PATHS.CHAT}/${chatId}/members/${userId}`);
  },
}