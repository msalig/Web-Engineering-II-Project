import {Component} from '@angular/core';
import {IUser} from "../../interfaces/user";
import {UserService} from "../Services/communication/user.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent {
  private _listfilter: string = '';
  private authors: IUser[] = [];
  private _filteredAuthors: IUser[];

  private userService: UserService;

  constructor(private http: HttpClient) {
    this.userService = new UserService(http);

    this.userService.getUsers()
      .subscribe(users => {
        users.forEach(user => {
          if (user.countBlogEntries > 0) {
            this.authors.push(this.userService.mapAuthor(user));
          }
        })
      });

    this._filteredAuthors = this.authors
  }

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

  private performFilter(filterBy: string): void {
    filterBy = filterBy.toLowerCase();
    this._filteredAuthors = this.authors;
    this._filteredAuthors = this.authors.filter((author: IUser) =>
      author.displayname.toLowerCase().includes(filterBy)
    )
  }
}
