import { Injectable } from '@angular/core';
import {IUser} from "../../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  static _User:IUser={
    displayname:  "Kaninchen Stiermann",
    mail:"kaninchen@stiermann.de",
    name: "kaninchenstiermann",
    publishedblogs: 0
  };

  // static _User:IUser;

 public static get User(): IUser {
    return this._User;
  }


  public static set User(value: IUser) {
    this._User = value;
  }
  constructor() { }


  public getUser(){
   return(AuthorizationService._User);
  }
}
