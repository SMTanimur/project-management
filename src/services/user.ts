import { api } from '@/api';
import { API_PATHS } from '@/lib';
import { IUser } from '@/types/user';

export const user = {
  ME: async (): Promise<IUser> => {
    const response = await api.get(API_PATHS.ME);
    return response.data;
  },

  GET_USERS: async ({ email }: { email: string }): Promise<IUser[]> => {
    const response = await api.get(`${API_PATHS.USERS}?email=${email}`);
    return response.data;
  },
};
