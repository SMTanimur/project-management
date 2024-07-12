import { Icons } from "@/components/ui/icons";
import { Node, NodeProps } from "@xyflow/react";




export interface BaseNode {
  botflowId: string
  parentId?: string
  isParent?: boolean
  color?: string
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

 interface FollowUpNode  {
  output: string;
 }

export interface IBotNode extends BaseNode   {

  text_data:TextNode,
  follow_up_data:FollowUpNode
  message_data:MessageNode
} 

export interface IBotNodeData extends Omit<NodeProps<Node>, 'data'> {
  position: { x: number; y: number };
  
   data: IBotNode
}
export enum EdgeType {
  DEFAULT = "default",
  CUSTOM = "custom"

}

export enum NodeType {
  START="start",
  TEXT="text",
  MESSAGE="message",
  FOLLOW_UP="follow_up",
}


