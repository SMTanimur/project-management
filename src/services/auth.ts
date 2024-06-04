import { api } from "@/api";
import { API_PATHS } from "@/lib";
import { LogingInput, RegisterInput } from "@/types";


export const  auth ={
  LOGIN: async (payload:LogingInput) => {
    return await api.post(API_PATHS.LOGIN, payload)
  },
  REGISTER: async (payload:RegisterInput) => {
    return await api.post(API_PATHS.REGISTER, payload)
  },

}  
