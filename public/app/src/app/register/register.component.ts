import { Component } from '@angular/core';
import {UserService} from "../Services/communication/user.service";
import {HttpClient} from "@angular/common/http";
import {IUserFromBackend} from "../../interfaces/userfrombackend";
import {IUser} from "../../interfaces/user";
import {AuthorizationService} from "../Services/authorization.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  private userService:UserService |undefined;
  private authorizationService:AuthorizationService|undefined;



  private _displayName = '';
  private _password = '';
  private _email='';

  errorText = ""

  constructor(private http:HttpClient, private router:Router) {
    this.userService=new UserService(http);
    this.authorizationService=new AuthorizationService();
    // this.authorizationService =  new AuthorizationService();

    // console.log(btoa(mockBlogEntry().blogentry));
    // console.log(atob(btoa(mockBlogEntry().blogentry)));
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
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


  //authenticationService: AuthenticationService;

  //User=this.authenticationService.currentUser;


  register() {
    if (this._password.length < 5) {
      this.errorText = "Password should have at least 5 characters";


      if (this._displayName.length < 5) {
        this.errorText = "Username should have at least 5 characters";


      }
    }
    console.log(this.errorText)

    if(this._password.length >= 5 && this._displayName.length >= 5){
      let newUser:IUserFromBackend= {
        displayName: this.displayName,
        username: this.displayName.toLowerCase().trim(),
        email: this.email,
        countBlogEntries:0,
        _id:'0'
      }
      AuthorizationService.User = {
        displayname:  this.displayName,
        name: this.displayName.toLowerCase().trim(),
        mail:this.email,
        publishedblogs: 0
      };
    this.router.navigateByUrl("/my-account")
    }
  }
}
