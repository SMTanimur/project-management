"use client"
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components'
import { Input } from '@/components'
import { Textarea } from '@/components'
import { Button } from '@/components'
import { Icons } from '@/components'


import { useBotFlow } from '@/hooks/botflow/useBotflow'

export const CreateBotflowForm = () => {




    const {botflowForm,createBotflow,isCreating}=useBotFlow()
  return (
    <div className='pb-4'>
    <Form {...botflowForm} >
    <form
    className='grid gap-6'
    onSubmit={(...args) =>
      void botflowForm.handleSubmit(createBotflow)(...args)
    }
  >
    <FormField
      control={botflowForm.control}
      name='name'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input  {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    
    <FormField
      control={botflowForm.control}
      name='description'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea
              placeholder=''
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

   
    <Button disabled={isCreating} className=' ' size={'sm'}>
      {isCreating && (
        <Icons.spinner
          className='mr-2 h-4 w-4 animate-spin'
          aria-hidden='true'
        />
      )}
      Create
    </Button>
  </form>

    </Form>
    </div>
  )
}
