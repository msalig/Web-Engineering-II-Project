import {Component, OnInit} from '@angular/core';
import {getBlogEntrys} from "../../MockData/mockblogEntrys";
import {mockBlogEntry} from "../../MockData/mockblogEntry";
import {ActivatedRoute} from "@angular/router";
import {IBlogEntry} from "../../interfaces/blogEntry";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {HttpClient} from "@angular/common/http";
import {IBlogEntryFromBackend} from "../../interfaces/IBlogEntryFromBackend";
import {response} from "express";
import {GetblogsService} from "../Services/communication/getblogs.service";
import {async} from "rxjs";
import {IUser} from "../../interfaces/user";
import {ILocation} from "../../interfaces/Iocation";
import {UserService} from "../Services/communication/user.service";
import {LocationService} from "../Services/communication/location.service";

// import {BlogService}from '../Service/blog-service'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent{
  blog: IBlogEntry | undefined;
  private getblogsService: GetblogsService;
  private userService: UserService;
  private locationService: LocationService;
  protected readonly faUser = faUser;


  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.getblogsService = new GetblogsService(http);
    this.userService = new UserService(http);
    this.locationService = new LocationService(http);

    const blogIdentifier = String(this.route.snapshot.paramMap.get('identifier'));

    this.getblogsService.getBlogByIdentifier(blogIdentifier).subscribe(thisblog => {


      this.userService.getUserById(thisblog.authorId).subscribe(responseUser => {

          let author =this.userService.mapUser(responseUser[0])

          this.locationService?.getLocationById(thisblog.locationId).subscribe(responseLocation => {
              let location: ILocation = this.locationService.mapLocation(responseLocation)

            console.log("asdf")

              this.blog = {
                author: author,
                blogentry: atob(thisblog.text),
                blogentryShort: atob(thisblog.textShort),
                comments: [],
                displayname: thisblog.url,
                location: location,
                review: thisblog.review,
                tags: thisblog.tags,
                title: thisblog.title

              }

            })
        }
      )
    })
  }
}
