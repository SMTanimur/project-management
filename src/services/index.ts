import { authService } from './auth';
import { botflow } from './botflow';
import { user } from './user';
export * from './organization';

export * from './chat';

export const API_SERVICE = {
  AUTH: authService,
  USER: user,
  BOTFLOW: botflow,
};
