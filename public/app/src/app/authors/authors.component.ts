import { Component } from '@angular/core';
import {mockAuthors} from "../../MockData/mockAuthors";
import {IUser} from "../../interfaces/user";
import {filter} from "rxjs";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent {


  private _listfilter : string = '';
  private authors: IUser[];
  private _filteredAuthors:IUser[];
  get listfilter() {
    return this._listfilter;
  }

  set listfilter(value) {
    this._listfilter = value;
    this.performFilter(value);
  }

  get filteredAuthors(): IUser[] {
    return this._filteredAuthors;
  }


  constructor() {
  this.authors=mockAuthors();
  this._filteredAuthors=this.authors
  }

  private performFilter(filterBy: string):void {
    filterBy = filterBy.toLowerCase();
    this._filteredAuthors=this.authors;
    this._filteredAuthors = this.authors.filter((author:IUser)=>
      author.displayname.toLowerCase().includes(filterBy)
    )
  }
}
