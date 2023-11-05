export interface IBlogEntryFromBackend {
  _id:number;
  authorId:string;
  title:string;
  url:string;
  locationId:string;
  text:string;
  textShort:string;
  review:number;
  tags:string[];
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
