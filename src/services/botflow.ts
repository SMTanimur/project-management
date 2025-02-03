import { api } from "@/api";
import { API_PATHS } from "@/lib";
import { IBotflow } from "@/types/workflow";
import { TBotflow } from "@/validations";



export const botflow ={
  name:"BOTFLOWS",
  CREATE: async (input:TBotflow):Promise<IBotflow> => {
     const response = await api.post(API_PATHS.CreateBotflow, input)
     return response.data
  }
  ,
  GET_WORKFLOWS:async ():Promise<IBotflow[]> => {
    const response = await api.get(API_PATHS.GetBotflows)
    return response.data
  },
  GET:async (id:string):Promise<IBotflow> => {
    const response = await api.get(`${API_PATHS.GetBotflow}/${id}`)
    return response.data
  },
  UPDATE:async (id:string,input:TBotflow):Promise<IBotflow> => {
    const response = await api.patch(`${API_PATHS.UpdateBotflow}/${id}`, input)
    return response.data
  },

  DELETE:async (id:string):Promise<void> => {
    const response = await api.delete(`${API_PATHS.DeleteBotflow}/${id}`)
    return response.data
  }

}