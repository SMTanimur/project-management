import { z } from "zod"
const workflowStatusSchema = z.enum(["online", "offline"])
export type WorkflowStatus = z.infer<typeof workflowStatusSchema>
import { Edge } from "@xyflow/react"
import { IBotNodeData } from "../botflow";


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




export const actionSchema = z.object({
  _id: z.string().optional(),
  type: z.string(),
  title: z.string(),
  description: z.string(),
  inputs: z.record(z.any()),
})

export type Action = z.infer<typeof actionSchema>






export interface IBotflow {
  _id: string,
  name: string,
  type: string,
  visibility: string,
  status: string,
  flow:{
    nodes:IBotNodeData[]| []
    edges:Edge[]| []  
  }

}