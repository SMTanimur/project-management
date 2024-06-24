import { Node } from "reactflow";

export interface TextNode extends Node {
  text: string;
  
}
 interface MessageNode extends Node {
  message: string;
  to_message: string;
  
 }

 interface FollowUpNode extends Node {
  output: string;
 }

export type IBotNode = TextNode | MessageNode | FollowUpNode & {
  botflowId: string
  parentId?: string
  isParent?: boolean
  color?: string
}


