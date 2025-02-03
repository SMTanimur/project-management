import { capitalize, isArray } from 'lodash';
import axios, { AxiosResponse } from 'axios';
import { toast } from '@/lib/toast';
import Cookies from 'js-cookie';

export const baseURL = process.env.NEXT_PUBLIC_API_URL + '/';
export const socketBaseURL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  config => {
    const token = Cookies.get('Authentication');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Handle responses
api.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response.data;
  },
  async error => {
    if (error.response?.data?.message) {
      if (isArray(error.response?.data?.message)) {
        error.response.data.message.forEach((message: string) =>
          toast({ title: capitalize(message), icon: 'error' })
        );
      } else {
        toast({ title: error.response.data.message, icon: 'error' });
      }
    }

    // Handle authentication errors
    if (error.response?.status === 401) {
      Cookies.remove('Authentication');
      window.location.href = '/auth/login';
    }

    return Promise.reject(error.response?.data);
  }
);

export { api };
