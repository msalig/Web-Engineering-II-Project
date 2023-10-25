import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {mockAuthorByDisplayName} from "../../MockData/mockAuthor";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent {
  constructor(private route: ActivatedRoute) {
    this._author = this.getAuthor();
  }

  private _author: any;

  get author(): any {
    return this._author;
  }

  private getAuthor() {
    const authorIdentifier = String(this.route.snapshot.paramMap.get('author'))
    return mockAuthorByDisplayName(authorIdentifier);
  }
}
