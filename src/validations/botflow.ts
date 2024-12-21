import { z } from "zod"
const botflowStatusSchema = z.enum(["online", "offline"])
export type BotflowStatus = z.infer<typeof botflowStatusSchema>




export const botflowSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  description: z.string().min(2, { message: "Description must be at least 2 characters long" }).optional(),
  type: z.string().min(2, { message: "Type must be at least 2 characters long" }).optional(),
  status: botflowStatusSchema.optional(),
  visibility: botflowStatusSchema.optional(),
  flow: z.record(z.any()).optional(),
});

export type TBotflow = z.infer<typeof botflowSchema>;

