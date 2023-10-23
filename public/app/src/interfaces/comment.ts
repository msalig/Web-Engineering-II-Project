import {IUser} from "./user";

export interface IComment {
  author: IUser;
  title: string;
  comment: string;
  review:number;
}
