"use client"
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SendEmailNodeSchema } from './form.type';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components';
import { Button } from '@/components';
import { Card } from '@/components';
import { Input } from '@/components';

import { Textarea } from '@/components';
import { useNodeDataChange } from '@/hooks';
import { useBotPropertyStore } from '@/store';
import { SelectComponent } from '@/components';

interface IProps{
  onCloseModal:()=>void;
}
const SendEmailForm = ({onCloseModal}:IProps) => {
  const { updateNodeData } = useNodeDataChange();
  const { botNodeData} =
    useBotPropertyStore();

  const defaultValues = {
    sendEmail_data: {
      recipient_email:
        botNodeData?.data?.sendEmail_data?.recipient_email || [],
      subject: botNodeData?.data?.sendEmail_data?.subject || '',
      body: botNodeData?.data?.sendEmail_data?.body || '',
      sendTime: botNodeData?.data?.sendEmail_data?.sendTime || '',
    },
    label: botNodeData?.data?.label || '',
    description: botNodeData?.data?.description || '',
  };

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(SendEmailNodeSchema),
    defaultValues,
  });

  const { control, setValue, handleSubmit, watch } = methods;
  const emailOptions = [
    {
      value: 'email1@example.com',
      label: 'email1@example.com',
    },
    {
      value: 'email2@example.com',
      label: 'email2@example.com',
    },
    {
      value: 'email3@example.com',
      label: 'email3@example.com',
    },
  ];
  useEffect(() => {
    if (botNodeData?.data) {
      setValue(
        'sendEmail_data.recipient_email',
        botNodeData?.data?.sendEmail_data?.recipient_email || []
      );
      setValue(
        'sendEmail_data.subject',
        botNodeData?.data?.sendEmail_data?.subject || ''
      );
      setValue(
        'sendEmail_data.body',
        botNodeData?.data?.sendEmail_data?.body || ''
      );
     
      setValue(
        'sendEmail_data.sendTime',
        botNodeData?.data?.sendEmail_data?.sendTime || ''
      );
      setValue('label', botNodeData?.data?.label || '');
      setValue('description', botNodeData?.data?.description || '');
    }
  }, [setValue, botNodeData?.data]);

  const onSubmit = async (data: any) => {
    console.log(data, 'data'); // Debugging statement
    updateNodeData({
      id: botNodeData?.id as string,
      data: {
        sendEmail_data: data.sendEmail_data,
        label: data.label,
        description: data.description,
      },
    });
   onCloseModal()
  };

  const getEmailOptions = (emails:any)=>{
     return emails?.map((email:any)=>({
      label:email,
      value:email
     })) ?? []
   
    
  }

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
                <div className='flex flex-col gap-3'>
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
                  <div className='grid grid-cols-1 gap-5'>
                    <FormField
                      control={control}
                      name='sendEmail_data.recipient_email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recipient Email</FormLabel>
                          <FormControl>
                            <SelectComponent
                              createAble
                              value={field.value}
                              onChange={field.onChange}
                              options={getEmailOptions(watch("sendEmail_data.recipient_email"))}
                              isMulti
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name='sendEmail_data.subject'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='Enter email subject'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name='sendEmail_data.body'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Body</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder='Enter email body'
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

export default SendEmailForm;
