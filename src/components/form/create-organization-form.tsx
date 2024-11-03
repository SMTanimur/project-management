'use client';

import { useOrganization } from '@/hooks';
import React, { useEffect } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  RadioGroup,
  RadioGroupItem,
  Textarea,
} from '../ui';
import { Loader2 } from 'lucide-react';
import { COLORS_ARRAY } from '@/constants';
import { RadioItem } from '@radix-ui/react-dropdown-menu';

export const CreateOrganizationForm = () => {
  const { organizationForm, handleCreateOrganization, isCreating } =
    useOrganization();

  const { watch, setValue } = organizationForm;

  const logo = watch('logo');
  const logoText = watch('logoText');
  const brandColor = watch('brandColor');

  useEffect(() => {
    if (logo) {
      setValue('logoText', '');
    }
  }, [logo]);
  return (
    <div className='w-full'>
      <Form {...organizationForm}>
        <form
          onSubmit={organizationForm.handleSubmit(handleCreateOrganization)}
          className='space-y-4'
        >
          <div className='space-y-4'>
            <FormField
              control={organizationForm.control}
              name='name'
              render={({ field }) => (
                <FormItem className='flex gap-4 items-center'>
                  <FormLabel className='w-28'> Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={organizationForm.control}
              name='description'
              render={({ field }) => (
                <FormItem className='flex gap-4 items-center'>
                  <FormLabel className='w-28'> Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className='flex  items-center'>
              <FormLabel className='w-28'> Logo</FormLabel>
              <Dialog >
                <DialogTrigger asChild className='p-0'>
                  <div className='flex gap-4 cursor-pointer'>
                    <Avatar
                      className='w-10 h-10'
                      style={{ backgroundColor: brandColor }}
                    >
                      <AvatarImage src={logo} alt='@shadcn' />
                      <AvatarFallback>{logoText}</AvatarFallback>
                    </Avatar>
                    <Button variant='outline' className='text-primary'>
                      Click to edit
                    </Button>
                  </div>
                </DialogTrigger>
                <DialogContent className='max-w-2xl w-full'>
                  <h1 className='text-2xl font-bold'>Edit Logo</h1>
                  <div className='space-y-4'>
                    <FormField
                      control={organizationForm.control}
                      name='logoText'
                      render={({ field }) => (
                        <FormItem className='flex-1'>
                          <FormLabel className='w-28'>Custom Text</FormLabel>
                          <FormControl>
                            <Input type='text' {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={organizationForm.control}
                      name='brandColor'
                      render={({ field }) => (
                        <FormItem className='flex-1'>
                          <FormLabel>Select Color</FormLabel>
                          <FormControl>
                          <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              {COLORS_ARRAY.map((color, index) => (
                                <RadioGroupItem 
                                  className='w-10 h-10'
                                  key={index} 
                                  value={color}
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className='flex justify-end'>
          <Button type='submit' disabled={isCreating}>
            {isCreating && <Loader2 className='w-4 h-4 mr-2 animate-spin' />}
            {isCreating ? 'Creating...' : 'Create'}
          </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
