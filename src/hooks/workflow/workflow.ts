import { toast } from "@/lib";
import { API_SERVICE } from "@/services";
import { IWorkflow } from "@/types/workflow";
import { useQuery } from "@tanstack/react-query";

export const getWorkflows=  () => {
  try {
    return useQuery<IWorkflow[]>({
      queryKey: [API_SERVICE.WORKFLOW.name],
      queryFn: API_SERVICE.WORKFLOW.GET_WORKFLOWS,
    });
    
  } catch (error: any) {
    console.log(error);
    toast({
      title: error.message,
      icon: error,
    });
  }
};