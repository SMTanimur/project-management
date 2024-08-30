"use client"
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Icons } from '../ui/icons'


import { useBotFlow } from '@/hooks/botflow/useBotflow'

const CreateBotflowForm = () => {




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

export default CreateBotflowForm
