import { api } from "@/api";
import { API_PATHS } from "@/lib";
import { CreateWorkflowDto, IWorkflow, WorkflowStatus } from "@/types/workflow";

export const workflow ={
  name:"WORKFLOW",
  CREATE: async (input:CreateWorkflowDto):Promise<IWorkflow> => {
    return await api.post(API_PATHS.CreateWorkflow, input)
  }
  ,
  GETALL:async ():Promise<IWorkflow[]> => {
    return await api.get(API_PATHS.GetWorkflows)
  },
  GET:async (id:string):Promise<IWorkflow> => {
    return await api.get(`${API_PATHS.GetWorkflow}/${id}`)
  },
  UPDATE:async (id:string,input:CreateWorkflowDto):Promise<IWorkflow> => {
    return await api.put(`${API_PATHS.UpdateWorkflow}/${id}`, input)
  },

  DELETE:async (id:string):Promise<void> => {
    return await api.delete(`${API_PATHS.DeleteWorkflow}/${id}`)
  }

}