export interface IUserFromBackend {
  _id: string;
  countBlogEntries: number;
  displayname: string;
  username: string;
  email: string;
}

export interface IAuthorFromBackend {
  _id: string,
  displayname: string;
  username: string;
}

export interface ISendUserBackendRegister {
  displayname: string;
  username: string;
  email: string;
  password: string;
}

export interface IsendUserBackendLogin {
  "username": string,
  "password": string
}

export interface ISendUserBackendUpdate {
  _id: string;
  displayname: string;
  username: string;
  email: string;
  password: string;
}
