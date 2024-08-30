
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TriggerSchema } from './form.type';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNodeDataChange } from '@/hooks';
import { useBotPropertyStore } from '@/store/botfllow';


const TriggerForm = () => {
  const { updateNodeData } = useNodeDataChange();
  const { botNodeData, setShowBotProperty, setBotNodeData } =
    useBotPropertyStore();

  const defaultValues = {
    trigger_data: {
      action: botNodeData?.data?.trigger_data?.action|| '',
    },
    label: botNodeData?.data?.label || '',
    description: botNodeData?.data?.description || '',
  };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(TriggerSchema),
    defaultValues,
  });

  const { control, setValue, handleSubmit } = methods;

  useEffect(() => {
    if (botNodeData?.data) {
      setValue('trigger_data.action', botNodeData?.data?.trigger_data?.action|| '');
      setValue('label', botNodeData?.data?.label || '');
      setValue('description', botNodeData?.data?.description || '');
    }
  }, [setValue, botNodeData?.data]);

  const onSubmit = async (data: any) => {
    console.log(data, 'data'); // Debugging statement
    updateNodeData({
      id: botNodeData?.id as string,
      data: {
        trigger_data: data.trigger_data,
        label: data.label,
        description: data.description,
      },
    });
    setBotNodeData(null);
    setShowBotProperty(false);
  };

  return (
    <div className='px-6 py-4 max-h-[600px] overflow-y-auto'>
      <Card className='py-4'>
        <Form {...methods}>
          <form
            className='flex flex-col justify-between px-5 gap-5 relative'
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className='py-2 pr-2'>
              <div className='flex flex-col justify-between h-full'>
                <div className='flex flex-col gap-5'>
                  <div className='grid grid-cols-1 gap-5'>
                  <FormField
                      control={control}
                      name='label'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='Enter name'
                            />
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
                      name='trigger_data.action'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Action name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder='type name' />
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

export default TriggerForm;