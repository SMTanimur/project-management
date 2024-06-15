"use client"
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useWorkflow } from '@/hooks'
import { useGlobalModalStateStore } from '@/store/modal'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Icons } from '../ui/icons'

const CreateWorkflowForm = () => {

  const {workflowForm,createWorkflow,isCreating}=useWorkflow()
  
  return (
    <div className='pb-4'>
    <Form {...workflowForm} >
    <form
    className='grid gap-6'
    onSubmit={(...args) =>
      void workflowForm.handleSubmit(createWorkflow)(...args)
    }
  >
    <FormField
      control={workflowForm.control}
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
      control={workflowForm.control}
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

export default CreateWorkflowForm
