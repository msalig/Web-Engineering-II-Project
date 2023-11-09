import {Component} from '@angular/core';
import {UserService} from "../Services/communication/user.service";
import {HttpClient} from "@angular/common/http";
import {ISendUserBackendRegister, IUserFromBackend} from "../../interfaces/userfrombackend";
import {IUser} from "../../interfaces/user";
import {AuthorizationService} from "../Services/authorization.service";
import {Router} from "@angular/router";
import {response} from "express";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  private userService: UserService;
  private authorizationService: AuthorizationService;


  private _displayName = '';
  private _password = '';
  private _email = '';

  errorText = ""

  constructor(private http: HttpClient, private router: Router) {
    this.userService = new UserService(http);
    this.authorizationService = new AuthorizationService(http);
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
// .toLowerCase().replace(/ /g,"_")
  register() {
    if (this._password.length < 5) {
      this.errorText = "Password should have at least 5 characters";


      if (this._displayName.length < 5) {
        this.errorText = "Username should have at least 5 characters";


      }
    }
    console.log(this.errorText)

    if (this._password.length >= 5 && this._displayName.length >= 5) {

      this.authorizationService.register({
        username: this.userService.getDisplayName(this._displayName),
        displayname: this.displayName,
        email: this.email,
        password: this._password
      }).subscribe(response => {

          // AuthorizationService._User = this.userService.mapUser(response);
          AuthorizationService.setUser(response)
          this.router.navigateByUrl("/my-account")
      })
    }

    setTimeout(()=>{
      this.errorText ="Registration was forbidden. Please Use other credentials or take a vacation"
    },500)

  }


  keyDownEvent($event: KeyboardEvent) {
    if($event.key=="Enter"){
      console.log("HaTsChIe!!");
      console.log("--Gesundheit")

      this.register()
    }
  }


}
