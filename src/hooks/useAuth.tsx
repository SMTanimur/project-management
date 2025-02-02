'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LogingInput, RegisterInput } from '@/types';
import { API_PATHS, QUERY_KEY, toast } from '@/lib';
import { TLogin, TSignup, loginSchema, signupSchema } from '@/validations/auth';
import { createUserSchema, TCreateUser } from '@/validations';
import { setAuthCookie } from '@/utils';
import { baseURL } from '@/api';

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
    mutationFn: async (data: LogingInput) => {
      const response = await fetch(`${baseURL}${API_PATHS.LOGIN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }
      setAuthCookie(response);
      return response.json();
    },
    mutationKey: [QUERY_KEY.LOGIN],
  });
  const {
    mutateAsync: registerMutateAsync,
    isPending: isRegisterPending,
    isError: isRegisterError,
  } = useMutation({
    mutationFn: async (data: RegisterInput) => {
      const response = await fetch(`${baseURL}${API_PATHS.REGISTER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      setAuthCookie(response);

      return response.json();
    },
    mutationKey: [QUERY_KEY.LOGIN],
  });
  const login = loginForm.handleSubmit(async (data: LogingInput) => {
    try {
      loginMutateAsync(data, {
        onSuccess: data => {
          toast({
            title: data.message,
          });
          push('/');
        },
        onError: error => {
          toast({
            title: error.message,
            icon: 'error',
          });
        },
      });
    } catch (error) {
      console.error(error);
    }
  });

  const signUp = registerForm.handleSubmit(async (data: TCreateUser) => {
    try {
      registerMutateAsync(data, {
        onSuccess: data => {
          // Cookies.set('Authentication', data.token, {
          //   expires: data.expires,
          // });
          toast({
            title: data.message,
          });
          push('/dashboard');
        },
        onError: error => {
          toast({
            title: error.message,
            icon: 'error',
          });
        },
      });
    } catch (error) {
      console.error(error);
    }
  });

  const logout = async () => {
    try {
      const response = await fetch(`${baseURL}${API_PATHS.LOGOUT}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      queryClient.clear();
      toast({
        title: 'Logged out',
        icon: 'success',
      });
      push('/');
    } catch (error: any) {
      toast({
        title: error.message,
        icon: 'error',
      });
      console.error(error);
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
