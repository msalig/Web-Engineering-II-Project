import {Injectable} from '@angular/core';
import {IUser} from "../../interfaces/user";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {IsendUserBackendLogin, ISendUserBackendRegister, IUserFromBackend} from "../../interfaces/userfrombackend";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {
  static _User: IUserFromBackend = {
    _id: '',
    countBlogEntries: 0,
    displayname: '',
    username: '',
    email: ''
  };


  constructor(private http: HttpClient) {
  }

  // static _User:IUser={
  //   displayname:  "Julia Meier",
  //   mail:"julia.meier@example.com",
  //   name: "julia_meier",
  //   publishedblogs: 0
  // };


  public static getUser(): IUserFromBackend {
    if (localStorage.getItem("displayName") == null)
    {
      console.log("no credentials in storage.")
      return this._User;
    }
  else {


      return{// @ts-ignore
        _id: localStorage.getItem("id"),
        countBlogEntries: 0,  // @ts-ignore
        displayname: localStorage.getItem("displayName"), // @ts-ignore
        email: localStorage.getItem("mail"), // @ts-ignore
        username: localStorage.getItem("username")
      }
      // return { // @ts-ignore
      //   displayname: localStorage.getItem("displayName"), // @ts-ignore
      //   mail: localStorage.getItem("mail"), // @ts-ignore
      //   name: localStorage.getItem("username"),
      //   id:localStorage.getItem("id"),
      //   publishedblogs: 0
      // }
    }
  }



  // public static get User(): IUser {
  //   if (localStorage.getItem("displayName") == null)
  //     return this._User;
  //   else {
  //
  //     return { // @ts-ignore
  //       displayname: localStorage.getItem("displayName"), // @ts-ignore
  //       mail: localStorage.getItem("mail"), // @ts-ignore
  //       name: localStorage.getItem("name"),
  //       publishedblogs: 0
  //     }
  //   }
  //
  //
  // }

  public static setUser(value: IUserFromBackend) {
    console.log(value)
    localStorage.setItem("displayName", value.displayname)
    localStorage.setItem("username", value.username)
    localStorage.setItem("mail", value.email)
    localStorage.setItem("id", value._id)
  }


  register(user: ISendUserBackendRegister) {
    return this.http.post<IUserFromBackend>("http://localhost:3000/api/users", user)
  }


  login(user: IsendUserBackendLogin) {
    return this.http.post<IUserFromBackend>("http://localhost:3000/api/users/login", user)
  }



  updateCredentials(user:IUserFromBackend){
    return this.http.put<IUserFromBackend>("http://localhost:3000/api/users/" + user._id,user)
  }


}
