import { API_SERVICE } from '@/services';

import Cookies from 'js-cookie';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
  const session = Cookies.get('Authentication');

  const profile = useQuery({
    queryKey: [API_SERVICE.USER.ME.name],
    queryFn: API_SERVICE.USER.ME,
    enabled: !!session,
  });

  return {
    ...profile,
    user: profile.data,
  };
};

export const useGetUsers = (email?: string) => {
  const response = useQuery({
    queryKey: [API_SERVICE.USER.GET_USERS.name, email],
    queryFn: () => API_SERVICE.USER.GET_USERS({ email: email || '' }),
  });

  return {
    ...response,
    users: response.data,
  };
};


