"use client";

import { useForm } from "react-hook-form";


import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogingInput, RegisterInput } from "@/types";
import { QUERY_KEY, toast } from "@/lib";
import { API_SERVICE } from "@/services";
import { TLogin, TSignup, loginSchema, signupSchema } from "@/validations/auth";

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


  const registerForm = useForm<TSignup>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      passwordConfirm: '',
    },
  });
  const  { mutateAsync:loginMutateAsync,isPending:isLoginPending,isError:isLoginError}=useMutation({
    mutationFn:API_SERVICE.AUTH.LOGIN,
    mutationKey:[QUERY_KEY.LOGIN]
  })
  const  { mutateAsync:registerMutateAsync,isPending:isRegisterPending,isError:isRegisterError}=useMutation({
    mutationFn:API_SERVICE.AUTH.REGISTER,
    mutationKey:[QUERY_KEY.LOGIN]
  })
  const login = loginForm.handleSubmit(async (data:LogingInput) => {
    try {
     loginMutateAsync (data,{
        onSuccess:(data)=>{
        
          toast({
            title:data.message
          })
          push("/")
        },
        onError:(error)=>{
          console.log({error})
          toast({
            title: error.message,
            icon: "error",
          });
        }
     })
    } catch (error) {
      console.error(error);
    }
  });

  const signUp = registerForm.handleSubmit(async (data: RegisterInput) => {
    try {
      registerMutateAsync(data,{
        onSuccess:(data)=>{
          toast({
            title:data.data.message
          })
          push("/dashboard")
        },
        onError:(error)=>{
          toast({
            title: error.message,
            icon: "error",
          });
        }
      })
    } catch (error) {
      console.error(error);
    }
  });

  // const logout = async () => {
  //   try {
  //     toast.promise(AUTH_API.logout(), {
  //       loading: "Logging out...",
  //       success: () => {
  //         setLoggedIn(false);
  //         push("/");
  //         queryClient.removeQueries({ queryKey: ["me"], exact: true });
  //         return "Logged out!";
  //       },
  //       error: (err) => {
  //         console.log(err);
  //         return err.message;
  //       },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return { login, signUp,  registerForm, loginForm, isLoginPending, isRegisterPending, isLoginError, isRegisterError};
};