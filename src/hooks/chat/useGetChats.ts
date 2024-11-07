import { CHAT_API } from '@/services';
import { useGlobalLocalStateStore } from '@/store';
import { useQuery } from '@tanstack/react-query';

export const useGetChats = () => {
  const { currentOrganizationId } = useGlobalLocalStateStore();

  const response = useQuery({
    queryKey: [CHAT_API.GET_USER_CHATS.name, currentOrganizationId],
    queryFn: () => CHAT_API.GET_USER_CHATS(currentOrganizationId as string),
  });

  return {
    ...response,
    chats: response.data,
  };
};
