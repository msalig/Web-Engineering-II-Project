import {Component, OnInit} from '@angular/core';
import {getBlogEntrys} from "../../MockData/mockblogEntrys";
import {mockBlogEntry} from "../../MockData/mockblogEntry";
import {ActivatedRoute} from "@angular/router";
import {IBlogEntry} from "../../interfaces/blogEntry";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {HttpClient} from "@angular/common/http";
import {IBlogEntryFromBackend} from "../../interfaces/IBlogEntryFromBackend";
import {response} from "express";

// import {BlogService}from '../Service/blog-service'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blog: IBlogEntry;
  protected readonly faUser = faUser;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.blog = this.getBlog();
  }


  ngOnInit() {
    // this.blog = this.getBlog();
  }

  getBlog() {
    const blogIdentifier = String(this.route.snapshot.paramMap.get('identifier'));
    const authorIdentifier = String(this.route.snapshot.paramMap.get('author'));
    let receivedblog: IBlogEntry[] = [];
    this.http.get<IBlogEntryFromBackend>('http://localhost:3000/api/blogEntries/' + blogIdentifier)
      .subscribe(response => {
        receivedblog.push({
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
        });
        console.log(receivedblog);
      })


    console.log(blogIdentifier);
    console.log(authorIdentifier);
    return receivedblog[0];
  }


}
