import { toast } from '@/lib';
import { API_SERVICE } from '@/services';
import { CreateWorkflowDto, IWorkflow, workflowSchema } from '@/types/workflow';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export const useWorkflow = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const workflowForm = useForm<CreateWorkflowDto>({
    resolver: zodResolver(workflowSchema),
    defaultValues: {},
  });

  const CreateWorkflow = async () => {
    try {
      return useMutation({
        mutationFn: API_SERVICE.WORKFLOW.CREATE,
        mutationKey: [API_SERVICE.WORKFLOW.name],
        onSuccess(data) {
          queryClient.invalidateQueries({
            queryKey: [API_SERVICE.WORKFLOW.name],
          });
          toast({
            title: 'successfully created',
          });
          router.push(`/workflow/${data._id}`);
        },
        onError(error) {
          toast({
            title: error.message,
            icon: 'error',
          });
        },
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: error.message,
        icon: error,
      });
    }
  };

  return {
    workflowForm,
    createWorkflow: CreateWorkflow,
  };
};
