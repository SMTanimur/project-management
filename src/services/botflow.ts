import { api } from "@/api";
import { API_PATHS } from "@/lib";
import { IBotflow } from "@/types/workflow";
import { TBotflow } from "@/validations";



export const botflow ={
  name:"BOTFLOWS",
  CREATE: async (input:TBotflow):Promise<IBotflow> => {
    return await api.post(API_PATHS.CreateBotflow, input)
  }
  ,
  GET_WORKFLOWS:async ():Promise<IBotflow[]> => {
    return await api.get(API_PATHS.GetBotflows)
  },
  GET:async (id:string):Promise<IBotflow> => {
    return await api.get(`${API_PATHS.GetBotflow}/${id}`)
  },
  UPDATE:async (id:string,input:TBotflow):Promise<IBotflow> => {
    return await api.patch(`${API_PATHS.UpdateBotflow}/${id}`, input)
  },

  DELETE:async (id:string):Promise<void> => {
    return await api.delete(`${API_PATHS.DeleteBotflow}/${id}`)
  }

}