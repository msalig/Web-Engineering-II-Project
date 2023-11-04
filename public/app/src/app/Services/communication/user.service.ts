import { Injectable } from '@angular/core';
import {IUser} from "../../../interfaces/user";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  // public async getUsers(){
  //
  //   let users:IUser[]=[];
  //   this.http.get("http://localhost:3000/api/users")
  //     .subscribe(response =>{
  //       response.forEach(user)
  //     })
  // }
  public async getUserById
}
