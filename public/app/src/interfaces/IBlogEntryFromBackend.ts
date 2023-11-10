export interface IBlogEntryFromBackend {
  _id: string;
  authorId: string;
  title: string;
  url: string;
  locationId: string;
  text: string;
  textShort: string;
  review: number;
  tags: string[];
  comments: string[];
  __v: number;
}

export interface IBlogEntryFromBackendShort {
  _id: string;
  url: string;
  authorId: string;
  review: number;
  tags: string[];
  comments: string[];
  textShort: string;
  locationId: string;
  title: string;
}

export interface IBlogEntryPutPost {
  "authorId": string;
  "title": string;
  "locationId": string;
  "text": string;
  "textShort": string;
  "review": number,
  "tags": string[],
  "comments": string[];
}
