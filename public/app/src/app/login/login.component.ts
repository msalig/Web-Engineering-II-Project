import { Component } from '@angular/core';
import {mockBlogEntry} from "../../MockData/mockblogEntry";
// import {AuthenticationService} from "../Service/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private _displayName: any;
  private _password: any;
  get displayName(): any {
    return this._displayName;
  }

  set displayName(value: any) {
    this._displayName = value;
  }

  get password(): any {
    return this._password;
  }

  set password(value: any) {
    this._password = value;
  }
  //authenticationService: AuthenticationService;


  constructor() {
    //this.authenticationService =  new AuthenticationService;

    console.log(btoa(mockBlogEntry().blogentry));
    console.log(atob(btoa(mockBlogEntry().blogentry)));
  }

  //User=this.authenticationService.currentUser;


  login() {
    if(this._password.length > 5 && this._displayName.length>5){

    }



  }
}
