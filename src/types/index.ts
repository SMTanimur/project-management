export * from "./toast"
export * from "./auth"
export * from "./botflow"
export * from './user'
export * from './config'
export * from './toast'
export * from './workflow'
export * from './oragnization'
export * from './chat'
export interface ITodo{
    id: number;
    title: string;
    date:string
    description:string;
    descriptionText?:string;
    tag?:string;
    priority?:string;
    assignee:string;
    path?:string;
    status?:string;
}

export interface INote{
 id:number;
 user:string;
 thumb:string;
 title:string;
 description:string;
 date:string;
 isFav:boolean;
 tag?:string;


}