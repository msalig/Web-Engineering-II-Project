import {Injectable} from '@angular/core';
import {IUser} from "../../interfaces/user";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {IsendUserBackendLogin, ISendUserBackendRegister, IUserFromBackend} from "../../interfaces/userfrombackend";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {
  static _User: IUser = {
    displayname: '',
    name: '',
    mail: '',
    publishedblogs: 0
  };

  // static _User:IUser={
  //   displayname:  "Julia Meier",
  //   mail:"julia.meier@example.com",
  //   name: "julia_meier",
  //   publishedblogs: 0
  // };


  public static getUser(): IUser {
    if (localStorage.getItem("displayName") == null)
    {
      console.log("no credentials in storage.")
      return this._User;
    }
  else {

      return { // @ts-ignore
        displayname: localStorage.getItem("displayName"), // @ts-ignore
        mail: localStorage.getItem("mail"), // @ts-ignore
        name: localStorage.getItem("name"),
        publishedblogs: 0
      }
    }
  }


  constructor(private http: HttpClient) {
  }


  public static get User(): IUser {
    if (localStorage.getItem("displayName") == null)
      return this._User;
    else {

      return { // @ts-ignore
        displayname: localStorage.getItem("displayName"), // @ts-ignore
        mail: localStorage.getItem("mail"), // @ts-ignore
        name: localStorage.getItem("name"),
        publishedblogs: 0
      }
    }


  }

  public static setUser(value: IUser) {
    localStorage.setItem("displayName", value.displayname)
    localStorage.setItem("name", value.name)
    localStorage.setItem("mail", value.mail)
  }


  register(user: ISendUserBackendRegister) {
    return this.http.post<IUserFromBackend>("http://localhost:3000/api/users", user)
  }


  login(user: IsendUserBackendLogin) {
    return this.http.post<IUserFromBackend>("http://localhost:3000/api/users/login", user)
  }


}
