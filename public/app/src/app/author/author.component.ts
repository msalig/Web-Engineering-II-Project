import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../Services/communication/user.service";
import {HttpClient} from "@angular/common/http";
import {GetblogsService} from "../Services/communication/getblogs.service";
import {IBlogEntry} from "../../interfaces/blogEntry";
import {ILocation} from "../../interfaces/Iocation";
import {LocationService} from "../Services/communication/location.service";
import {IUser} from "../../interfaces/user";


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent {
  private userService: UserService;
  private blogService: GetblogsService;
  private locationService: LocationService;
  private _author: IUser = {
    displayname: "", mail: "", name: "", publishedblogs: 0
  };
  private _blogs: IBlogEntry[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.userService = new UserService(http);
    this.blogService = new GetblogsService(http);
    this.locationService = new LocationService(http);
    this.getAuthor();
  }

  get blogs(): IBlogEntry[] {
    return this._blogs;
  }

  get author(): IUser {
    return this._author;
  }

  private getAuthor() {
    const authorIdentifier = String(this.route.snapshot.paramMap.get('author'))

    this.userService.getUserByUserName(authorIdentifier).subscribe(responseAuthor => {
      this._author = this.userService.mapAuthor(responseAuthor);

      this.blogService.getBlogByAuthor(authorIdentifier).subscribe(response => {

        response.forEach(blogBackend => {

          this.locationService?.getLocationById(blogBackend.locationId)
            .subscribe(responseLocation => {
                let location: ILocation = this.locationService.mapLocation(responseLocation)

                console.log(response)

                this._blogs.push({
                  author: this._author,
                  blogentry: blogBackend.comments.length.toString(),
                  blogentryShort: atob(blogBackend.textShort),
                  comments: [],
                  displayname: blogBackend.url,
                  location: location,
                  review: blogBackend.review,
                  tags: blogBackend.tags,
                  title: blogBackend.title

                })
              }
            );
        })
      })
    })
  }
}
