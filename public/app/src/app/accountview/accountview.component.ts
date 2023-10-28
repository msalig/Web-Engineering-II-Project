import { Component } from '@angular/core';
import {IBlogEntry} from "../../interfaces/blogEntry";
import {getBlogEntrys, getBlogEntrysByAuthor} from "../../MockData/mockblogEntrys";
import {faEdit, faUser} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-accountview',
  templateUrl: './accountview.component.html',
  styleUrls: ['./accountview.component.scss']
})
export class AccountviewComponent {
  filteredBlogEntrys: IBlogEntry[] = [];
  private blogEntrys: IBlogEntry[];

  constructor() {
    this.blogEntrys = getBlogEntrys();
    this.filteredBlogEntrys = this.blogEntrys;
  }

  private _listFilter: string = '';

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.performFilter(value);
  }

  performFilter(filterBy: string): void {
    filterBy = filterBy.toLowerCase();
    this.filteredBlogEntrys = this.blogEntrys.filter((blog: IBlogEntry) =>
      blog.author.name.toLowerCase().includes(filterBy) || blog.title.toLowerCase().includes(filterBy) || blog.tags.toLocaleString().toLowerCase().includes(filterBy) || blog.location.country.toLowerCase().includes(filterBy) || blog.location.place.toLowerCase().includes(filterBy));
  }

  protected readonly faUser = faUser;
  protected readonly faEdit = faEdit;
}
