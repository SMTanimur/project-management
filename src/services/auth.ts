import { api } from '@/api';
import { API_PATHS } from '@/lib';
import { IUser, LogingInput, RegisterInput } from '@/types';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export interface AuthResponse {
  message: string;
  token: string;
  user: IUser;
  userId: string;
}

const COOKIE_NAME = 'Authentication';
const COOKIE_EXPIRATION_DAYS = 7;

const authService = {
  setToken: (token: string) => {
    try {
      const decodedToken = jwtDecode(token);
      Cookies.set(COOKIE_NAME, token, {
        expires: COOKIE_EXPIRATION_DAYS,
        secure: true,
        sameSite: 'strict',
      });
      return decodedToken;
    } catch (error) {
      console.error('Failed to decode token:', error);
      throw new Error('Invalid token format');
    }
  },

  getToken: (): string | null => {
    try {
      return Cookies.get(COOKIE_NAME) || null;
    } catch (error) {
      console.error('Failed to get token:', error);
      return null;
    }
  },

  clearToken: () => {
    try {
      Cookies.remove(COOKIE_NAME);
    } catch (error) {
      console.error('Failed to clear token:', error);
    }
  },

  isAuthenticated: (): boolean => {
    try {
      const token = authService.getToken();
      if (!token) return false;

      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      console.error('Failed to check authentication:', error);
      return false;
    }
  },

  login: async (payload: LogingInput): Promise<AuthResponse> => {
    try {
      const { data } = await api.post<AuthResponse>(API_PATHS.LOGIN, payload);
      console.log({ data });
      if (data?.token) {
        authService.setToken(data.token);
      }
      return data;
    } catch (error: any) {
      const errorMessage = error.message || 'Login failed';
      console.error('Login failed:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  register: async (payload: RegisterInput): Promise<AuthResponse> => {
    try {
      const { data } = await api.post(API_PATHS.REGISTER, payload);

      if (data?.token) {
        authService.setToken(data.token);
      }
      return data;
    } catch (error: any) {
      const errorMessage = error.message || 'Registration failed';
      console.error('Registration failed:', errorMessage);
      throw new Error(errorMessage);
    }
  },

  logout: async (): Promise<void> => {
    try {
      authService.clearToken();
    } catch (error) {
      console.error('Logout failed:', error);
      throw new Error('Logout failed');
    }
  },

  getUserFromToken: (): Partial<IUser> | null => {
    try {
      const token = authService.getToken();
      if (!token) return null;

      const decodedToken: any = jwtDecode(token);
      return decodedToken.user || null;
    } catch (error) {
      console.error('Failed to get user from token:', error);
      return null;
    }
  },
};

export { authService };
