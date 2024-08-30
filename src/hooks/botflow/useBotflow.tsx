
import { API_SERVICE } from '@/services';


import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation,  useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';



import { useGlobalModalStateStore } from '@/store/modal';
import { Node } from '@xyflow/react';
import { NodeType } from '@/types';
import { toast } from '@/lib';
import { botflowSchema, TBotflow } from '@/validations';


export const useBotFlow = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {oncloseModal}=useGlobalModalStateStore()
  const botflowForm = useForm<TBotflow>({
    resolver: zodResolver(botflowSchema),
    defaultValues: {},
  });

  const {mutateAsync,isPending:isCreating}=useMutation({
    mutationFn: API_SERVICE.BOTFLOW.CREATE,
    mutationKey: [API_SERVICE.BOTFLOW.name],
    
  });
  const { mutateAsync: updateMutateAsync, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, input }: { id: string; input: TBotflow }) => API_SERVICE.BOTFLOW.UPDATE(id, input),
    mutationKey: [API_SERVICE.BOTFLOW.name],
  });
  const { mutateAsync: deleteMutateAsync, isPending: isDeleting } = useMutation({
    mutationFn: (id:string) => API_SERVICE.BOTFLOW.DELETE(id),
    mutationKey: [API_SERVICE.BOTFLOW.name],
  });

  const initialNodes: Node[] = [
    {
      id: 'Trigger_1',
      type: NodeType.TRIGGER,
      data: {
        icon: 'trigger',
        label: 'Trigger',
        description: 'where you Botflow begins',
      },
      position: { x: 350, y: 200 },
    },
  ];

  const createBotflow = async (data:TBotflow) => {
   
      if (!data.flow) {
        data.flow = {};
      }
      data.flow.nodes = initialNodes;
    
       console.log({data})
       try {
       await mutateAsync(data,{
          onSuccess(data) {
            queryClient.invalidateQueries({
              queryKey: [API_SERVICE.BOTFLOW.name],
            });
            toast({
              title: 'successfully created',
            });
  
            oncloseModal()
            router.push(`/botflow/${data._id}`);
          },
          onError(error) {
            console.log(error);
          },
        })
       } catch (error:any) {
         console.log(error);
       }
  };
  const updateBotflow = async (data:TBotflow) => {
   
    
       try {
       await updateMutateAsync({id:data._id as string,input:data},{
          onSuccess(data:any) {
            queryClient.invalidateQueries({
              queryKey: [API_SERVICE.BOTFLOW.name],
            });
            toast({
              title: 'successfully Updated',
            });
  
            oncloseModal()
           
          },
          onError(error) {
            console.log(error);
          },
        })
       } catch (error:any) {
         console.log(error);
       }
  };
  const deleteBotflow = async (id:string) => {
   
    
       try {
       await deleteMutateAsync(id,{
          onSuccess(data:any) {
            queryClient.invalidateQueries({
              queryKey: [API_SERVICE.BOTFLOW.name],
            });
            toast({
              title: 'successfully Deleted',
            });
           
          },
          onError(error) {
            console.log(error);
          },
        })
       } catch (error:any) {
         console.log(error);
       }
  };

 

  return {
    botflowForm,
    createBotflow,
    isCreating,
    updateBotflow,
    isUpdating,
    deleteBotflow,
    isDeleting
    
    
   
  };
};
