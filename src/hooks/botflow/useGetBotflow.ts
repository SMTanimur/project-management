
import { API_SERVICE } from "@/services";
import { IBotflow } from "@/types/workflow";

import { useQuery } from "@tanstack/react-query";

export const GetBotflows=  () => {
  try {
    return useQuery<IBotflow[]>({
      queryKey: [API_SERVICE.BOTFLOW.name],
      queryFn: API_SERVICE.BOTFLOW.GET_WORKFLOWS,
    });
    
  } catch (error: any) {
    console.log(error);
    
  }
};

export const GetWorkflowById = (id: string) => {
   return useQuery<IBotflow>({
    queryKey: [API_SERVICE.BOTFLOW.name, id],
    queryFn: () => API_SERVICE.BOTFLOW.GET(id),
  });
}