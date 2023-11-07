import {IAuthorFromBackend} from "./userfrombackend";

export interface ICommentFromBackend {
  _id: string;
  blogEntryId: string;
  author: IAuthorFromBackend;
  title: string;
  text: string;
  review: number;
}
