import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  private _displayName = '';
  private _password = '';
  private _email='';

  errorText = ""

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


  constructor() {
    //this.authenticationService =  new AuthenticationService;

    // console.log(btoa(mockBlogEntry().blogentry));
    // console.log(atob(btoa(mockBlogEntry().blogentry)));
  }

  //User=this.authenticationService.currentUser;


  login() {
    if (this._password.length < 5) {
      this.errorText = "Password should have at least 5 characters";


      if (this._displayName.length < 5) {
        this.errorText = "Username should have at least 5 characters";


      }
    }
    console.log(this.errorText)

  }
}
