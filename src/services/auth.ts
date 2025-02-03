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

class AuthService {
  private readonly COOKIE_NAME = 'Authentication';
  private readonly COOKIE_EXPIRATION_DAYS = 7;

  setToken(token: string) {
    const decodedToken = jwtDecode(token);
    Cookies.set(this.COOKIE_NAME, token, {
      expires: this.COOKIE_EXPIRATION_DAYS,
      secure: true,
      sameSite: 'strict',
    });
  }

  getToken(): string | null {
    return Cookies.get(this.COOKIE_NAME) || null;
  }

  clearToken() {
    Cookies.remove(this.COOKIE_NAME);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch {
      return false;
    }
  }

  async login(payload: LogingInput): Promise<AuthResponse> {
    const {data} = await api.post<AuthResponse>(API_PATHS.LOGIN, payload);
    if (data && data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async register(payload: RegisterInput): Promise<AuthResponse> {
    const {data} = await api.post<AuthResponse>(API_PATHS.REGISTER, payload);
    if (data && data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async logout(): Promise<void> {
    this.clearToken();
  }
}

export const authService = new AuthService();
