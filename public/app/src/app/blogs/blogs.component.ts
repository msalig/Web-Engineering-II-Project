import { Component } from '@angular/core';
import {getBlogEntrys} from "../../MockData/mockblogEntrys";
import {faComment, faUser} from "@fortawesome/free-solid-svg-icons";
import {IBlogEntry} from "../../interfaces/blogEntry";
// import location from "$GLOBAL$";
// import location from "$GLOBAL$";
// import {convertToStars} from "../../assets/convert-to-stars.pipe";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})

export class BlogsComponent {

  constructor() {
    this.blogEntrys = getBlogEntrys();
    this.filteredBlogEntrys = this.blogEntrys;
  }

  protected readonly getBlogEntrys = getBlogEntrys;

  protected readonly location = location;
  protected readonly faComment = faComment;
  protected readonly faUser = faUser;
    // protected readonly convertToStars = convertToStars;
    // protected readonly convertToStars = convertToStars;

//
  private _listFilter:string='';
  private blogEntrys: IBlogEntry[];
  filteredBlogEntrys:IBlogEntry[]=[];
//
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.performFilter(value);
  }

  performFilter(filterBy:string):void{
    filterBy = filterBy.toLowerCase();
    this.filteredBlogEntrys = this.blogEntrys.filter((blog:IBlogEntry)=>
    blog.title.toLowerCase().includes(filterBy));
  }



}
