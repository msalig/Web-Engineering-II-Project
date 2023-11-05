export interface IUserFromBackend{
  _id: string;
  countBlogEntries: number;
  displayName:string;
  username:string;
  email:string;
}

export interface IAuthorFromBackend{
  _id:string,
  displayname:string;
  username:string;
}
