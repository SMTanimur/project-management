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
  description: z.string(),
  status: workflowStatusSchema,
  nodes: z.array(nodeSchema).optional(),
})

export type Workflow = z.infer<typeof workflowSchema>