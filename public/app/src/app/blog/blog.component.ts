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

// import {BlogService}from '../Service/blog-service'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blog: IBlogEntry | undefined;
  anotherBlog: IBlogEntry | undefined;
  private getblogsService: GetblogsService | undefined;
  protected readonly faUser = faUser;

  async ngOnInit() {

  }

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.getblogsService = new GetblogsService(http);


    const blogIdentifier = String(this.route.snapshot.paramMap.get('identifier'));
    const authorIdentifier = String(this.route.snapshot.paramMap.get('author'));

    // this.getblogsService.getBlogById()

    // console.log("BlogEntrys:" && getblogsService.getBlogEntrys());

    // this.blog = this.getBlog()[1];
    // this.blog=mockBlogEntry();


  }


  getBlog() {
    const blogIdentifier = String(this.route.snapshot.paramMap.get('identifier'));
    const authorIdentifier = String(this.route.snapshot.paramMap.get('author'));
    let receivedblog: IBlogEntry[] = [];
    let receivedfirstblog: IBlogEntry;

    this.http.get<IBlogEntryFromBackend>('http://localhost:3000/api/blogEntries/' + blogIdentifier)
      .subscribe(response => {
        return {
          displayname: response._id.toString(),
          author: {
            displayname: "kreuzfahrtfan",
            name: "cruiselover222",
            mail: "cruiselover222@example.com",
            publishedblogs: 7,
          },
          title: response.title,
          location: {
            "country": "Deutschland",
            "place": "Berlin",
            "coordinates": {
              "x": 52.5200,
              "y": 13.4050
            }
          },
          blogentryShort: response.text,
          blogentry: response.text,
          comments: [],
          tags: response.tags,
          review: response.review
        };
        console.log(receivedblog);
        console.log(receivedblog[0]);
        return receivedblog[0];
      })


    console.log(blogIdentifier);
    console.log(authorIdentifier);
    console.log(receivedblog);
    return receivedblog[0];

  }


}
