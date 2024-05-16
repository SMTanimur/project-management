
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