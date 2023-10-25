import {Component, Input} from '@angular/core';
import {getBlogEntrys, getBlogEntrysByAuthor} from "../../MockData/mockblogEntrys";
import {faComment, faUser} from "@fortawesome/free-solid-svg-icons";
import {IBlogEntry} from "../../interfaces/blogEntry";
import {ActivatedRoute} from "@angular/router";
// import location from "$GLOBAL$";
// import location from "$GLOBAL$";
// import {convertToStars} from "../../assets/convert-to-stars.pipe";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})

export class BlogsComponent {

  // @Input() author:string;

  filteredBlogEntrys: IBlogEntry[] = [];
  protected readonly location = location;
  protected readonly faComment = faComment;
  protected readonly faUser = faUser;
  // protected readonly convertToStars = convertToStars;
  // protected readonly convertToStars = convertToStars;
  private blogEntrys: IBlogEntry[];

  constructor(private route: ActivatedRoute) {
    this.blogEntrys = this.getBlogEntrys();
    this.filteredBlogEntrys = this.blogEntrys;
  }

//
  private _listFilter: string = '';

//

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.performFilter(value);
  }

  getBlogEntrys(): IBlogEntry[] {
    const authorIdentifier = String(this.route.snapshot.paramMap.get('author'))
    if (authorIdentifier.length != 4) {
      console.log(authorIdentifier.length);
      return getBlogEntrysByAuthor(authorIdentifier);
    }
    return getBlogEntrys();
  }

  performFilter(filterBy: string): void {
    filterBy = filterBy.toLowerCase();
    this.filteredBlogEntrys = this.blogEntrys.filter((blog: IBlogEntry) =>
      blog.title.toLowerCase().includes(filterBy));
  }


}
