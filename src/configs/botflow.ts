import { ISidebarNavigation } from "@/types/config";




export enum INodeType {
  
   TEXT = "text",
   // PUSH = "push",
   FOLLOW_UP = "followUp",
   MESSAGE = "message",



  
 }


export const sidebarNavigation:ISidebarNavigation[] = [
   

    {
     label:"Actions",
     type:"action",
     children:[
      
     {
        label:"Text",
        id:INodeType.TEXT,
        icon: "message",

     },
     {
        label:"Message",
        id:INodeType.MESSAGE,
        icon: "message",

     },
    
     {
        label:"Follow",
        icon:"bell",
        id:INodeType.FOLLOW_UP

     }
    
    ]
   
    }
]