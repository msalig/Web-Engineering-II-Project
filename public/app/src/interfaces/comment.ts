import {IAuthorFromBackend} from "./userfrombackend";

export interface IComment {
  commentid: string;
  author: IAuthorFromBackend;
  title: string;
  comment: string;
  review:number;
}


