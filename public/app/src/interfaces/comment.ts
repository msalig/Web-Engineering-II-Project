import {IUser} from "./user";

export interface IComment {
  commentid: number;
  author: IUser;
  title: string;
  comment: string;
  review:number;
}
