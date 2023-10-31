import { Injectable } from '@angular/core';
import {IUser} from "../../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  get currentUser(): IUser | undefined {
    return this._currentUser;
  }

  /*set currentUser(value: IUser) {
    this._currentUser = value;
  }*/

  private _currentUser:undefined=undefined;
  constructor() { }
}
