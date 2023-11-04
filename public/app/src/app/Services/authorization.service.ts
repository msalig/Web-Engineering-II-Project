import { Injectable } from '@angular/core';
import {IUser} from "../../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  static get User(): IUser {
    return this._User;
  }

  static set User(value: IUser) {
    this._User = value;
  }


  private static _User:IUser;
  constructor() { }
}
