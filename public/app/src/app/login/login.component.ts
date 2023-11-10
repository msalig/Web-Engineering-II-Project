import {Component} from '@angular/core';
import {AuthorizationService} from "../Services/authorization.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../Services/communication/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private authorizationService: AuthorizationService;
  private userService: UserService;
  private _displayName = '';
  private _password = '';
  errorText = ""

  constructor(private http: HttpClient, private router: Router) {
    this.authorizationService = new AuthorizationService(http);
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

    if (this._displayName.length > 5 && this._password.length >= 4) {
      console.log(this.errorText)

      this.authorizationService.login({
        username: this.userService.getDisplayName(this._displayName),
        password: this._password
      }).subscribe(response => {

        console.log(response)

        AuthorizationService.setUser(response);

        this.router.navigateByUrl("/my-account")
      })

      setTimeout(() => {
        this.errorText = "Registration was forbidden. Please Use other credentials or take a vacation"
      }, 500)
    }
  }

  keyDownEvent($event: KeyboardEvent) {
    if ($event.key == "Enter") {
      console.log("sent vacation invitations!!");
      this.login()
    }
  }
}
