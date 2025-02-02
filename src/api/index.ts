import { capitalize, isArray } from 'lodash';
import axios, { AxiosResponse } from 'axios';
import { cookies } from 'next/headers';

const getHeaders = () => ({
  Cookie: cookies().toString(),
});

import { toast } from '@/lib/toast';

export const baseURL = process.env.NEXT_PUBLIC_API_URL + '/';
export const socketBaseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: getHeaders(),
});

api.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

api.interceptors.response.use(
  async (response: AxiosResponse) => {
    return await response.data;
  },
  async error => {
    if (error.response?.data?.message) {
      if (isArray(error.response?.data?.message)) {
        error.response.data.message.forEach((message: string) =>
          toast({ title: capitalize(message), icon: 'error' })
        );
      }
    }
    if (error.response?.status === 401 || error.response?.status === 403) {
      // window.location.reload()
    }

    return Promise.reject(error.response?.data);
  }
);

export { api };
