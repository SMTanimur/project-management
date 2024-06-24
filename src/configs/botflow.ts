



export enum INodeType {
   EMAIL = "email",
   SMS = "sms",
   // PUSH = "push",
   FOLLOW_UP = "follow_up",
   UPDATE_PROFILE = "updateProfileProperty",
   NOTIFICATION = "notification",
   CONDITION = "condition",


  
 }


export const sidebarNavigation = [
   

    {
     label:"Actions",
     type:"action",
     children:[
        {
        name:"Email",
        id:INodeType.EMAIL,
        icon: "mail"

     },
     {
        name:"SMS",
        id:INodeType.SMS,
        icon: "message",

     },
     {
        name:"Update Profile Property",
        icon: "user",
        id:INodeType.UPDATE_PROFILE,
 
        
     },
     {
        name:"Notification",
        icon:"bell",
        id:INodeType.NOTIFICATION,

     }
    
    ]
   
    }
]