import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {mockAuthorByDisplayName} from "../../MockData/mockAuthor";
import {UserService} from "../Services/communication/user.service";
import * as http from "http";
import {HttpClient} from "@angular/common/http";
import {BlogsComponent} from "../blogs/blogs.component";
import {GetblogsService} from "../Services/communication/getblogs.service";
import {response} from "express";
import {IBlogEntry} from "../../interfaces/blogEntry";
import {IUser} from "../../interfaces/user";
import {ILocation} from "../../interfaces/Iocation";
import {LocationService} from "../Services/communication/location.service";


@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})

export class AuthorComponent {
  private userService: UserService;
  private blogService: GetblogsService;
  private locationService: LocationService;
  private _author: any;
  private _blogs: IBlogEntry[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.userService = new UserService(http);
    this.blogService = new GetblogsService(http);
    this.locationService = new LocationService(http);
    this._author = this.getAuthor();
  }

  get blogs(): IBlogEntry[] {
    return this._blogs;
  }

  get author(): any {
    return this._author;
  }

  private getAuthor() {
    const authorIdentifier = String(this.route.snapshot.paramMap.get('author'))

    this.blogService.getBlogByAuthor(authorIdentifier).subscribe(response => {

      console.log(response)

      this.userService.getUserById(response[0].authorId).subscribe(responseAuthor => {
        this._author = this.userService.mapUser(responseAuthor[0])

        console.log(this._author)
        console.log(response)

        response.forEach(blogBackend => {


          this.locationService?.getLocationById(blogBackend.locationId)
            .subscribe(responseLocation => {
                let location: ILocation = this.locationService.mapLocation(responseLocation)


                this._blogs.push({
                  author: this._author,
                  blogentry: atob(blogBackend.text),
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


  // return mockAuthorByDisplayName(authorIdentifier);
}

