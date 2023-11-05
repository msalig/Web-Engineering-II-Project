import { Injectable } from '@angular/core';
import {IUser} from "../../interfaces/user";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {IsendUserBackendLogin, ISendUserBackendRegister, IUserFromBackend} from "../../interfaces/userfrombackend";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {


  constructor(private http:HttpClient) {
}

  // static _User:IUser={
  //   displayname:  "Julia Meier",
  //   mail:"julia.meier@example.com",
  //   name: "julia_meier",
  //   publishedblogs: 0
  // };

  static _User:IUser= {
    displayname: '',
    name: '',
    mail: '',
    publishedblogs: 0
  };

 public static get User(): IUser {
    return this._User;
  }


  public static set User(value: IUser) {
    this._User = value;
  }



  public getUser(){
   return(AuthorizationService._User);
  }

register(user:ISendUserBackendRegister){
   return this.http.post<IUserFromBackend>("http://localhost:3000/api/users",user)
}


 login(user:IsendUserBackendLogin){
   return this.http.post<IUserFromBackend>("http://localhost:3000/api/users/login",user)
 }



}
