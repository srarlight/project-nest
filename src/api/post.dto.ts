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
  [x:string | number]:string | number
}
export interface postResult {
  list:postEntity[]
  count:number
}
