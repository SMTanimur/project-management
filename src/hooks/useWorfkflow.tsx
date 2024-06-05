import { API_SERVICE } from "@/services";
import { CreateWorkflowDto, Workflow, workflowSchema } from "@/types/workflow";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form";


export const  useWorkflow= ()=>{
  const queryClient = useQueryClient()
  

  const workflowForm = useForm<CreateWorkflowDto>({
    resolver: zodResolver(workflowSchema),
    defaultValues: {},

  });

 

  const createWorkflow = async (workflow: CreateWorkflowDto) => {
    try {
    return useMutation({
      mutationFn:API_SERVICE.WORKFLOW.CREATE,
      mutationKey:[API_SERVICE.WORKFLOW.name]
    })
       
     
    } catch (error) {
      console.log(error);
    }
  };
}