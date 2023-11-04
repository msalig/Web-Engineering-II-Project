export interface IBlogEntryFromBackend {
  _id:number;
  review:number;
  tags:string[];
  text:string;
  textShort:string;
  title:string;
  url:string;
  authorId:string;
  locationId:string;
  __v:number;
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
