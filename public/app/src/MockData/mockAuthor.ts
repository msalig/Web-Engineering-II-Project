import {IUser} from "../interfaces/user";

export function mockAuthorByDisplayName(displayName:string):IUser{
  return {
    displayname: "kreuzfahrtfan",
    name: "cruiselover222",
    mail: "cruiselover222@example.com",
    publishedblogs: 7,
  }
}


//{
//  "authorID": number bewtween 1 to 20,
//  "title": string between 10 and 40 characters,
//  "locationID": number between 1 to 30,
//  "text": blogentry about a famous city or place between 500 to 1900 words,
//  "review": number between 1 to 5,
//  "tags": an array of strings that are tags for the text,
//  "commentIDs": an array of 0 to 4 numbers ascending
//}
