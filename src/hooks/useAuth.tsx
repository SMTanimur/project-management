'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LogingInput } from '@/types';
import { QUERY_KEY, toast } from '@/lib';
import { TLogin, loginSchema } from '@/validations/auth';
import { createUserSchema, TCreateUser } from '@/validations';
import { API_SERVICE } from '@/services';

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
    mutationFn: API_SERVICE.AUTH.login,
    mutationKey: [QUERY_KEY.LOGIN],
    onSuccess: data => {
      console.log({ res: data });
      push('/dashboard');
    },
  });

  const {
    mutateAsync: registerMutateAsync,
    isPending: isRegisterPending,
    isError: isRegisterError,
  } = useMutation({
    mutationFn: API_SERVICE.AUTH.register,
    mutationKey: [QUERY_KEY.REGISTER],
    onSuccess: data => {
      console.log({ res: data });
      push('/dashboard');
    },
  });

  const login = loginForm.handleSubmit(async (data: LogingInput) => {
    try {
      await loginMutateAsync(data);
    } catch (error: any) {
      console.log({ error });
    }
  });

  const signUp = registerForm.handleSubmit(async (data: TCreateUser) => {
    try {
      await registerMutateAsync(data);
    } catch (error: any) {
      toast({
        title: error.message || 'Registration failed',
        icon: 'error',
      });
    }
  });

  const logout = async () => {
    try {
      await API_SERVICE.AUTH.logout();
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
