import { toast } from '@/lib';
import { API_SERVICE } from '@/services';
import { useGlobalModalStateStore } from '@/store/modal';
import { CreateWorkflowDto, IWorkflow, workflowSchema } from '@/types/workflow';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export const useWorkflow = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {oncloseModal}=useGlobalModalStateStore()
  const workflowForm = useForm<CreateWorkflowDto>({
    resolver: zodResolver(workflowSchema),
    defaultValues: {},
  });

  const {mutateAsync,isPending:isCreating}=useMutation({
    mutationFn: API_SERVICE.WORKFLOW.CREATE,
    mutationKey: [API_SERVICE.WORKFLOW.name],
    
  });

  const createWorkflow = async (data:CreateWorkflowDto) => {
     try {
      mutateAsync(data,{
        onSuccess(data) {
          queryClient.invalidateQueries({
            queryKey: [API_SERVICE.WORKFLOW.name],
          });
          toast({
            title: 'successfully created',
          });

          oncloseModal()
          router.push(`/workflow/${data._id}`);
        },
        onError(error) {
          toast({
            title: error.message,
            icon: 'error',
          });
        },
      })
     } catch (error:any) {
      toast({
        title: error,
        icon: 'error',
      });
     }

     
    
  };

 

  return {
    workflowForm,
    createWorkflow,
    isCreating,
    
   
  };
};
