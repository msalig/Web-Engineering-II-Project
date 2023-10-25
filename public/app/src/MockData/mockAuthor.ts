import {IUser} from "../interfaces/user";

export function mockAuthorByDisplayName(displayName:string):IUser{
  return {
    displayname: "kreuzfahrtfan",
    name: "cruiselover222",
    mail: "cruiselover222@example.com",
    publishedblogs: 7,
  }
}
