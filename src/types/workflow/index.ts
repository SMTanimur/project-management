import { z } from "zod"
const workflowStatusSchema = z.enum(["online", "offline"])
export type WorkflowStatus = z.infer<typeof workflowStatusSchema>


const nodeSchema = z.object(
  {
    id: z.string(),
    type:z.string()
  
  }
)
export const workflowSchema = z.object({
  _id: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  status: z.string().optional(),
  nodes: z.array(nodeSchema).optional(),
})

export interface CreateWorkflowDto {
  title: string;
  description?: string;
  status?: string;
  nodes?:[
    id: string,
    type: string
  ]

}

export type IWorkflow = z.infer<typeof workflowSchema>