import { api } from "@/api";
import { API_PATHS } from "@/lib";


export const CHAT_API ={
  GET_USER_CHATS: async (organizationId:string) => {
    return await api.get(`${API_PATHS.CHAT}/${organizationId}`);
  }
}