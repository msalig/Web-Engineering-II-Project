import { Component } from '@angular/core';
import {mockAuthors} from "../../MockData/mockAuthors";
import {IUser} from "../../interfaces/user";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent {
  get authors(): IUser[] {
    return this._authors;
  }
  private _authors: IUser[];

  constructor() {
  this._authors=mockAuthors();
  }

}
