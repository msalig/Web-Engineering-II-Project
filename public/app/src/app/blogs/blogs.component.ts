import {Component, Input, OnInit} from '@angular/core';
import {getBlogEntrys, getBlogEntrysByAuthor} from "../../MockData/mockblogEntrys";
import {faComment, faUser} from "@fortawesome/free-solid-svg-icons";
import {IBlogEntry} from "../../interfaces/blogEntry";
import {ActivatedRoute} from "@angular/router";
import {filter, map} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IBlogEntryFromBackend} from "../../interfaces/IBlogEntryFromBackend";
import {IUser} from "../../interfaces/user";
import {ILocation} from "../../interfaces/Iocation";
import {IComment} from "../../interfaces/comment";
import {GetblogsService} from "../Services/communication/getblogs.service";
import {UserService} from "../Services/communication/user.service";
import {LocationService} from "../Services/communication/location.service";


@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})

export class BlogsComponent {

  filteredBlogEntrys: IBlogEntry[] = [];
  protected readonly location = location;
  protected readonly faComment = faComment;
  protected readonly faUser = faUser;
  private blogEntrys: IBlogEntry[] = [];
  private backendRespond: IBlogEntryFromBackend[] | undefined;
  private _listFilter: string = '';
  private getblogsService: GetblogsService
  private userService: UserService
  private locationService: LocationService


  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.getblogsService = new GetblogsService(http);
    this.userService = new UserService(http);
    this.locationService = new LocationService(http);

    this.getBlogEntrys();


    this.filteredBlogEntrys = this.blogEntrys;
  }


  private getBlogEntrys() {
    this.getblogsService.getBlogsShort().subscribe(response =>
      response.forEach(blog => {

        this.userService?.getUserById(blog.authorId)
          .subscribe(responseUser => {
              let author = <IUser>this.userService?.mapUser(responseUser)


              this.locationService?.getLocationById(blog.locationId)
                .subscribe(responseLocation => {
                  let location: ILocation = this.locationService.mapLocation(responseLocation)


                  this.blogEntrys.push({
                    author: author,
                    blogentry: '',
                    blogentryShort: atob(blog.textShort),
                    comments: [],
                    displayname: blog.url,
                    location: location,
                    review: blog.review,
                    tags: blog.tags,
                    title: blog.title

                  })

                })

              console.log(author);
            }
          );
      }))
  }

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
}
