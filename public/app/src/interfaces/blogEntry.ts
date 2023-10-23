 import {ILocation} from "./Iocation";
 import {IUser} from "./user";
 import {IComment} from "./comment";

export interface IBlogEntry{
  author: IUser;
  title: string;
  location:ILocation;
  blogentryShort:string;
  blogentry: string;
  comments: IComment[];
  tags: string[];   //enum??



}
