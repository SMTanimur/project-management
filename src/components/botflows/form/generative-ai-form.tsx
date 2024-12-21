'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components';
import { Button } from '@/components';
import { Input } from '@/components/ui/input';
import { Card } from '@/components';

import { Textarea } from '@/components';
import { GenerativeAISchema } from './form.type';
import { useNodeDataChange } from '@/hooks';
import { useBotPropertyStore } from '@/store/botfllow';
interface IProps{
  onCloseModal:()=>void;
}
const GenerativeAIForm = ({onCloseModal}:IProps) => {
  const { updateNodeData } = useNodeDataChange();
  const { botNodeData } =
    useBotPropertyStore();

  const defaultValues = {
    generativeAI_data: botNodeData?.data?.generativeAI_data,
    label: botNodeData?.data?.label,
    description: botNodeData?.data?.description || '',
  };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(GenerativeAISchema),
    defaultValues,
  });

  const { control, setValue, handleSubmit } = methods;

  useEffect(() => {
    if (botNodeData?.data) {
      setValue(
        'generativeAI_data.content',
        botNodeData?.data?.generativeAI_data?.content || ''
      );

      setValue('label', botNodeData?.data?.label);
      setValue('description', botNodeData?.data?.description || '');
    }
  }, [setValue, botNodeData?.data]);

  const onSubmit = async (data: any) => {
    console.log(data, 'data'); // Debugging statement
    updateNodeData({
      id: botNodeData?.id as string,
      data: {
        generativeAI_data: data.generativeAI_data,
        label: data.label,
        description: data.description,
      },
    });
   onCloseModal()
  };

  return (
    <div className='px-6 py-4 max-h-[600px] overflow-y-auto'>
      <Card className='py-4'>
        <Form {...methods}>
          <form
            className=' flex flex-col justify-between px-5 gap-5  relative'
            onSubmit={(...args) => void methods.handleSubmit(onSubmit)(...args)}
          >
            <div className=' py-2 pr-2'>
              <div className='flex flex-col justify-between h-full'>
                <div className='flex flex-col gap-5 '>
                  <div className='grid grid-cols-1 gap-5'>
                    <FormField
                      control={control}
                      name='label'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder='Enter name' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name='description'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder='Enter Description'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name='generativeAI_data.content'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder='Ex. A beautiful painting of a girl with a halo'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button type='submit'>Save</Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default GenerativeAIForm;
