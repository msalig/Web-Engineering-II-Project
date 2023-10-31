import {Component, Input, OnInit} from '@angular/core';
import {getBlogEntrys, getBlogEntrysByAuthor} from "../../MockData/mockblogEntrys";
import {faComment, faUser} from "@fortawesome/free-solid-svg-icons";
import {IBlogEntry} from "../../interfaces/blogEntry";
import {ActivatedRoute} from "@angular/router";
import {filter} from "rxjs";
import {HttpClient} from "@angular/common/http";
// import location from "$GLOBAL$";
// import location from "$GLOBAL$";
// import {convertToStars} from "../../assets/convert-to-stars.pipe";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})

export class BlogsComponent implements OnInit{




    // @Input() author:string;

  filteredBlogEntrys: IBlogEntry[] = [];
  protected readonly location = location;
  protected readonly faComment = faComment;
  protected readonly faUser = faUser;
  // protected readonly convertToStars = convertToStars;
  // protected readonly convertToStars = convertToStars;
  private blogEntrys: IBlogEntry[];

  constructor(private route: ActivatedRoute, private http:HttpClient) {
    this.blogEntrys = this.getBlogEntrys();
    this.filteredBlogEntrys = this.blogEntrys;
  }
    ngOnInit() {
        console.log("Versuche Verbindung aufzubauen....");
        this.http.get('http://localhost:3000/api/blogEntries/').subscribe(response => {
            console.log("received message: ");
            console.log(response);
        })
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
    //if it is part of the author-page
    const authorIdentifier = String(this.route.snapshot.paramMap.get('author'))
    if (authorIdentifier.length != 4) {
      console.log(authorIdentifier.length);
      return getBlogEntrysByAuthor(authorIdentifier);
    }

    //if it is part of the search for tags-page
    const tagIdentifier = String(this.route.snapshot.paramMap.get('tag'))
    if(tagIdentifier.length >0){
      console.log(tagIdentifier);
      return getBlogEntrys();
    }


    //if it is part of the regular blogs-page
    return getBlogEntrys();
  }

  performFilter(filterBy: string): void {
    filterBy = filterBy.toLowerCase();
    this.filteredBlogEntrys = this.blogEntrys.filter((blog: IBlogEntry) =>
      blog.author.name.toLowerCase().includes(filterBy) || blog.title.toLowerCase().includes(filterBy) || blog.tags.toLocaleString().toLowerCase().includes(filterBy) || blog.location.country.toLowerCase().includes(filterBy) || blog.location.place.toLowerCase().includes(filterBy));

  }


}
