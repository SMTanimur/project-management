import { Icons } from "@/components/ui/icons";
import { Node, NodeProps } from "@xyflow/react";


export interface BaseNode {
  parentId?: string
  isParent?: boolean
  color?: string
  appId: string
  icon: keyof typeof Icons
  label: string
  description?: string
}
 interface MessageNode  {
  message: string;
  to_message: string;
  
 }
 export interface TextNode {
  text: string;
  
}


 export interface IFileGenerateNode  {
   file_name:string;
   file_type:string;
   content?:string;
 }
 export interface IGenerativeAINode {
  content:string;
 
 }

 export interface ISendEmailNode{
  recipient_email:string[]
  subject:string;
  body:string;
  isDelaySend:boolean
  sendTime?:string
 }



 export interface ITimerNode{
  delay:string;
 }



 export interface IConditionNode{
  if_condition?:{
    condition:string;
    value:string;
  },
  else_condition?:{
    condition:string;
    value:string;
  },
  name:string;
 }




export interface IBotFlowNode extends BaseNode   {

  fileGenerate_data?:IFileGenerateNode,
  textToJson_data?:{
    content:string
  }
  trigger_data?:{
    action:string
  }
  pdfGenerate_data?:{
    file_name:string
  },
  fileReader_data?:{
    file_name:any[]
    collection_file:string[]
  },
  generativeAI_data?:IGenerativeAINode,
  sendEmail_data?:ISendEmailNode,

  timer_data?:ITimerNode,
  condition_data?:IConditionNode,
}

export interface IBotNodeData extends Omit<NodeProps<Node>, 'data'> {
   description:string
   status?:string
   position:{
    x:number
     y:number
   }
   data: IBotFlowNode
}
export enum EdgeType {
  DEFAULT = "default",
  CUSTOM = "custom"

}

export enum NodeType {
  TRIGGER="trigger",
  FILEREADER="fileReader",
  FILEGENARATOR="fileGenerate",
  TEXTTOJSON="textToJson",
  EXTRACTDATA="extractData",
  GENERATIVEAI="generativeAi",
  SENDEMAIL="sendEmail",
  CONDITION="condition",

  TIMER="timer",
}


