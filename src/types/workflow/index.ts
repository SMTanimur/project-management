import { z } from "zod"
const workflowStatusSchema = z.enum(["online", "offline"])
export type WorkflowStatus = z.infer<typeof workflowStatusSchema>



export const workflowSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  description: z.string().optional(),
  status: z.string().optional(),
})

export interface CreateWorkflowDto {
  name: string;
  description?: string;
  status?: string;
 
}

export type IWorkflow = z.infer<typeof workflowSchema>


export const actionSchema = z.object({
  _id: z.string().optional(),
  type: z.string(),
  title: z.string(),
  description: z.string(),
  inputs: z.record(z.any()),
})

export type Action = z.infer<typeof actionSchema>