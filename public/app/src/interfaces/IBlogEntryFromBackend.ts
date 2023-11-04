export interface IBlogEntryFromBackend {
  _id:number;
  review:number;
  tags:string[];
  text:string;
  title:string;
}

export interface IBlogEntryFromBackendShort {
  _id:number;
  url:string;
  authorId:string;
  review:number;
  tags:string[];
  textShort:string;
  locationId:string;
  title:string;
}
