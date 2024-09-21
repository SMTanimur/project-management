'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FileGenerateSchema } from './form.type';
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
import { useNodeDataChange } from '@/hooks';
import { useBotPropertyStore } from '@/store/botfllow';
import { Textarea } from '@/components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const FileGenerateForm = () => {
  const { updateNodeData } = useNodeDataChange();
  const { botNodeData, setShowBotProperty, setBotNodeData } =
    useBotPropertyStore();
  const defaultValues = {
    fileGenerate_data: {
      file_name: botNodeData?.data?.fileGenerate_data?.file_name,
      file_type: botNodeData?.data?.fileGenerate_data?.file_type,
      content: botNodeData?.data?.fileGenerate_data?.content,
    },
    label: botNodeData?.data?.label || '',
    description: botNodeData?.data?.description || '',
  };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(FileGenerateSchema),
    defaultValues,
  });

  const { control, setValue } = methods;

  useEffect(() => {
    if (botNodeData?.data) {
      setValue(
        'fileGenerate_data.file_name',
        botNodeData?.data?.fileGenerate_data?.file_name
      );
      setValue(
        'fileGenerate_data.file_type',
        botNodeData?.data?.fileGenerate_data?.file_type
      );
      setValue(
        'fileGenerate_data.content',
        botNodeData?.data?.fileGenerate_data?.content
      );
      setValue('label', botNodeData?.data?.label);
      setValue('description', botNodeData?.data?.description || '');
    }
  }, [setValue, botNodeData?.data]);
  const onSubmit = async (data: any) => {
    console.log(data, 'data');
    updateNodeData({
      id: botNodeData?.id as string,
      data: {
        fileGenerate_data: data.fileGenerate_data,
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
                      name='fileGenerate_data.content'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder='Example: letter'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name='fileGenerate_data.file_name'
                      render={({ field }) => (
                        <FormItem className='flex flex-col'>
                          <FormLabel>File Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder='Example: letter' />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name='fileGenerate_data.file_type'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>File type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select a file type' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='.txt'>.txt</SelectItem>
                              <SelectItem value='.pdf'>.pdf</SelectItem>
                              <SelectItem value='.docx'>.docx</SelectItem>
                              <SelectItem value='.csv'>.csv</SelectItem>
                              <SelectItem value='.xlsx'>.xlsx</SelectItem>
                            </SelectContent>
                          </Select>

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

export default FileGenerateForm;
