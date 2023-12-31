import {AfterContentInit, Component} from '@angular/core';
import {faComment, faUser} from "@fortawesome/free-solid-svg-icons";
import {IBlogEntry} from "../../interfaces/blogEntry";
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {IBlogEntryFromBackend} from "../../interfaces/IBlogEntryFromBackend";
import {IUser} from "../../interfaces/user";
import {ILocation} from "../../interfaces/Iocation";
import {GetblogsService} from "../Services/communication/getblogs.service";
import {UserService} from "../Services/communication/user.service";
import {LocationService} from "../Services/communication/location.service";


@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})

export class BlogsComponent implements AfterContentInit {

  filteredBlogEntrys: IBlogEntry[] = [];
  protected readonly location = location;
  private blogEntrys: IBlogEntry[] = [];
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

  ngAfterContentInit() {
    setTimeout(() => {
      let tag = String(this.route.snapshot.paramMap.get('tag'));

      console.log(tag)
      if (tag.length != 4) {
        console.log(this.blogEntrys)
        this.blogEntrys = this.blogEntrys.filter((blog: IBlogEntry) =>
          blog.tags.toLocaleString().toLowerCase().includes(tag.toLowerCase()))
        this.filteredBlogEntrys = this.blogEntrys
      }
    }, 250)
  }

  private getBlogEntrys() {

    this.getblogsService.getBlogsShort().subscribe(response => {
      response.forEach(blog => {

        this.userService?.getUserById(blog.authorId)
          .subscribe(responseUser => {

              let author = <IUser>this.userService.mapUser(responseUser[0])

              this.locationService.getLocationById(blog.locationId)
                .subscribe(responseLocation => {
                  let location: ILocation = this.locationService.mapLocation(responseLocation)

                  this.blogEntrys.push({
                    author: author,
                    blogentry: blog.comments.length.toString(),
                    blogentryShort: atob(blog.textShort),
                    comments: [],
                    displayname: blog.url,
                    location: location,
                    review: blog.review,
                    tags: blog.tags,
                    title: blog.title
                  })
                })
            }
          );
      })
    })
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
