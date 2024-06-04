import { api } from "@/api"
import { API_PATHS } from "@/lib"
import { IUser } from "@/types/user"

export const  user ={
  ME: async ():Promise<IUser> => {
    return await api.get(API_PATHS.ME)
  },


}  