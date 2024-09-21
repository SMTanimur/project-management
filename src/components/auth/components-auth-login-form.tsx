'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { Input } from '@/components';
import { PasswordInput } from '@/components';
import { Button } from '@/components';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components';
import { useAuth } from '@/hooks';
import { Icons } from '@/components';

export const ComponentsAuthLoginForm = () => {
  const router = useRouter();

  const { login, loginForm, isLoginPending } = useAuth();

  return (
    <Form {...loginForm}>
      <form className='space-y-5 dark:text-white' onSubmit={login}>
        <FormField
          control={loginForm.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='example@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='**********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoginPending}>
          {isLoginPending && (
            <Icons.spinner
              className='mr-2 h-4 w-4 animate-spin'
              aria-hidden='true'
            />
          )}
          Sign in
          <span className='sr-only'>Sign in</span>
        </Button>
      </form>
    </Form>
  );
};
