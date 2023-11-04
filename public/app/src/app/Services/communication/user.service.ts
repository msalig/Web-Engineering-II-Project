import { Injectable } from '@angular/core';
import {IUser} from "../../../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUserFromBackend} from "../../../interfaces/userfrombackend";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getUserById(id:string):Observable<IUserFromBackend> {
    return this.http.get<IUserFromBackend>("http://localhost:3000/api/users/" + '654668d64781e006ae3dbee2');
  }

  mapUser(user:IUserFromBackend):IUser{
    return{
      displayname: user.displayName,
      mail: user.email,
      name: user.username,
      publishedblogs: 3
    }
  }
}
