'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LogingInput } from '@/types';
import { QUERY_KEY, toast } from '@/lib';
import { TLogin, loginSchema } from '@/validations/auth';
import { createUserSchema, TCreateUser } from '@/validations';
import { authService } from '@/services/auth';

export const useAuth = () => {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const loginForm = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const registerForm = useForm<TCreateUser>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      contact: '',
    },
  });

  const {
    mutateAsync: loginMutateAsync,
    isPending: isLoginPending,
    isError: isLoginError,
  } = useMutation({
    mutationFn: authService.login.bind(authService),
    mutationKey: [QUERY_KEY.LOGIN],
  });

  const {
    mutateAsync: registerMutateAsync,
    isPending: isRegisterPending,
    isError: isRegisterError,
  } = useMutation({
    mutationFn: authService.register.bind(authService),
    mutationKey: [QUERY_KEY.LOGIN],
  });

  const login = loginForm.handleSubmit(async (data: LogingInput) => {
    try {
      const response = await loginMutateAsync(data);
      toast({
        title: response.message,
      });
      push('/');
    } catch (error: any) {
      toast({
        title: error.message || 'Login failed',
        icon: 'error',
      });
    }
  });

  const signUp = registerForm.handleSubmit(async (data: TCreateUser) => {
    try {
      const response = await registerMutateAsync(data);
      toast({
        title: response.message,
      });
      push('/dashboard');
    } catch (error: any) {
      toast({
        title: error.message || 'Registration failed',
        icon: 'error',
      });
    }
  });

  const logout = async () => {
    try {
      await authService.logout();
      queryClient.clear();
      toast({
        title: 'Logged out successfully',
        icon: 'success',
      });
      push('/');
    } catch (error: any) {
      toast({
        title: error.message || 'Logout failed',
        icon: 'error',
      });
    }
  };

  return {
    login,
    signUp,
    registerForm,
    loginForm,
    isLoginPending,
    isRegisterPending,
    isLoginError,
    isRegisterError,
    logout,
  };
};
