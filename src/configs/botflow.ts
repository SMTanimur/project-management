import { ISidebarNavigation } from "@/types/config";




export enum INodeType {
   EMAIL = "email",
   SMS = "sms",
   // PUSH = "push",
   FOLLOW_UP = "follow_up",
   UPDATE_PROFILE = "updateProfileProperty",
   NOTIFICATION = "notification",
   CONDITION = "condition",


  
 }


export const sidebarNavigation:ISidebarNavigation[] = [
   

    {
     label:"Actions",
     type:"action",
     children:[
        {
        label:"Email",
        id:INodeType.EMAIL,
        icon: "mail"

     },
     {
        label:"SMS",
        id:INodeType.SMS,
        icon: "message",

     },
     {
        label:"Update Profile Property",
        icon: "user",
        id:INodeType.UPDATE_PROFILE,
 
        
     },
     {
        label:"Notification",
        icon:"bell",
        id:INodeType.NOTIFICATION,

     }
    
    ]
   
    }
]