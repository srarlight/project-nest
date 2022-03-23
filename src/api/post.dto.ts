//  
export interface postEntity {
  id: number;
  title: string;
  author: string;
  content:string
  thumb_url:string 
  tinyint:number
  createdAt: string;
  updatedAt:string
}
export interface postResult {
  list:postEntity[]
  count:number
}
