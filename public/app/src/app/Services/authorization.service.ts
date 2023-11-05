import { Injectable } from '@angular/core';
import {IUser} from "../../interfaces/user";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ISendUserBackend, IUserFromBackend} from "../../interfaces/userfrombackend";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {


  constructor(private http:HttpClient) {
}

  // static _User:IUser={
  //   displayname:  "Kaninchen Stiermann",
  //   mail:"kaninchen@stiermann.de",
  //   name: "kaninchenstiermann",
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

register(user:ISendUserBackend){
   return this.http.post<IUserFromBackend>("http://localhost:3000/api/users",user)
}




}
