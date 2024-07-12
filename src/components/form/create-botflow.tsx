"use client"
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useWorkflow } from '@/hooks'
import { useGlobalModalStateStore } from '@/store/modal'
import { Input } from '../ui/input'
import { nanoid } from "nanoid";
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { Icons } from '../ui/icons'
import { CreateWorkflowDto } from '@/types/workflow'
import { toast } from '@/lib'
import { IBotFlows, useBotFlowsStore } from '@/store/botfllow/botflows'
import { Node } from '@xyflow/react'
import { IBotNodeData } from '@/types'

const CreateBotflowForm = () => {

  const {workflowForm,isCreating}=useWorkflow()
  const {addBotflows}=useBotFlowsStore()
  const {setBotflowModal}=useGlobalModalStateStore()

  
  const createBotflow = async (data:CreateWorkflowDto) => {
     try {
       const id = nanoid()

      const initialNode:IBotNodeData={
        id:"start_node",
        data:{
          icon:"star",
          label:"Start",
          botflowId:id,
        },
        position: { x: 0, y: 0 },
        description: "", // Add the missing property
        type: "start",
        dragging: false,
        zIndex: 0,
        isConnectable: true,
        positionAbsoluteX: 0, // Add the missing property
        positionAbsoluteY: 0, // Add the missing property
        // Add any other missing properties
      }
       const botData:IBotFlows= {
        id,
        description: data?.description as string,
        name: data.name,
        nodes:[initialNode],
        edges:[]
       }
       addBotflows(botData)
       toast({
        title: 'Botflow created successfully',
        icon:'success',
      });
     setBotflowModal(false)
     } catch (error:any) {
      toast({
        title: error,
        icon: 'error',
      });
     }
    }
  return (
    <div className='pb-4'>
    <Form {...workflowForm} >
    <form
    className='grid gap-6'
    onSubmit={(...args) =>
      void workflowForm.handleSubmit(createBotflow)(...args)
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

export default CreateBotflowForm
