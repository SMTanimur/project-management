import { CHAT_API } from '@/services';
import { useGlobalLocalStateStore } from '@/store';
import { useQuery } from '@tanstack/react-query';

export const useGetChats = () => {
  const { currentOrganizationId } = useGlobalLocalStateStore();

  const response = useQuery({
    queryKey: [CHAT_API.GET_USER_CHATS.name, currentOrganizationId],
    queryFn: () => CHAT_API.GET_USER_CHATS(currentOrganizationId as string),
    enabled: !!currentOrganizationId,
  });

  return {
    ...response,
    chats: response.data,
  };
};

export const useGetChat = (chatId: string) => {
  const response = useQuery({
    queryKey: [CHAT_API.GET_CHAT_BY_ID.name, chatId],
    queryFn: () => CHAT_API.GET_CHAT_BY_ID(chatId),
    enabled: !!chatId,
  });
  return {
    ...response,
    chat: response.data,
  }
}
export const useGetChatMessages = (chatId:string) =>{


  const response = useQuery({
    queryKey: [CHAT_API.GET_CHAT_MESSAGES.name, chatId],
    queryFn: () => CHAT_API.GET_CHAT_MESSAGES(chatId as string),
    enabled: !!chatId,
  });


  return {
    ...response,
    messages: response.data?.data,
    
  }

 
}


