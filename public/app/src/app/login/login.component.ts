import {Component} from '@angular/core';
import {mockBlogEntry} from "../../MockData/mockblogEntry";
import {AuthorizationService} from "../Services/authorization.service";
import * as http from "http";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {response} from "express";
import {UserService} from "../Services/communication/user.service";

// import {AuthenticationService} from "../Service/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
private authorizationService:AuthorizationService;
private userService:UserService;
  private _displayName = '';
  private _password = '';
  errorText = ""


  constructor(private http: HttpClient, private router:Router) {
    this.authorizationService =  new AuthorizationService(http);
    this.userService = new UserService(http);
  }

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

  login() {
    if (this._displayName.length < 5) {
      this.errorText = "Username should have at least 5 characters";
    }
    if (this._password.length < 4) {
      this.errorText = "Password should have at least 5 characters";
    }


    if(this._displayName.length > 5 && this._password.length >= 4 ){
      console.log(this.errorText)

      console.log({
        username: this._displayName.toLowerCase().replace(/ /g,"_"),
        password: this._password
      })

      this.authorizationService.login({
        username: this._displayName.toLowerCase().replace(/ /g,"_"),
        password: this._password
      }).subscribe(response=>{

        AuthorizationService.setUser(this.userService.mapUser(response));
        this.router.navigateByUrl("/my-account")
      })
      this.errorText ="Registration was forbidden. Please Use other credentials or take a vacation"


    }
  }

  keyDownEvent($event: KeyboardEvent) {
    if($event.key=="Enter"){
      console.log("HaTsChIe!!");
      console.log("--Gesundheit")

      this.login()
    }
  }
}
