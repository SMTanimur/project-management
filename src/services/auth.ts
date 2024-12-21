import { api } from "@/api";
import { API_PATHS } from "@/lib";
import { IUser, LogingInput, RegisterInput } from "@/types";
import { loginResponseSchema } from "@/validations/auth";


export const  auth ={
  LOGIN: async (payload:LogingInput):Promise<loginResponseSchema> => {
    return await api.post(API_PATHS.LOGIN, payload)
  },
  REGISTER: async (payload:RegisterInput):Promise<{message:string,user:IUser}> => {
    return await api.post(API_PATHS.REGISTER, payload)
  },

  LOGOUT: async ():Promise<string>=> await api.delete(API_PATHS.LOGOUT)

}  
