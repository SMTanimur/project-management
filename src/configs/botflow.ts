
import { NodeType } from "@/types";
import { ISidebarNavigation } from "@/types/config";


export const sidebarNavigation:ISidebarNavigation[] = [
   

    {
   
     type:"action",
     label:"Action",
     children:[
      
     {
        type:"ExtractData",
        label:"Extract Data",
        id:NodeType.EXTRACTDATA,
        icon: "extractData",

     },
     {
        type:"FileGenerate",
        label:"Generate File",
        id:NodeType.FILEGENARATOR,
        icon: "fileGenerator",

     },
     {
        type:"TextToJson",
        label:"Text To JSON",
        id:NodeType.TEXTTOJSON,
        icon: "textToJson",

     },
     {
      type:"Timer",
      label:"Timer",
      icon:"timer",
      id:NodeType.TIMER

   },
   {
      type:"SendEmail",
      label:"Send Email",
      icon:"email",
      id:NodeType.SENDEMAIL

   },
    
     {
        type:"generativeAi",
        label:"Generative AI LLM",
        icon:"ai",
        id:NodeType.GENERATIVEAI

     },
   
    
    ]
   
    }
]