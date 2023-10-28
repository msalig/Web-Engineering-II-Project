import {Component, OnInit} from '@angular/core';
import {getBlogEntrys} from "../../MockData/mockblogEntrys";
import {mockBlogEntry} from "../../MockData/mockblogEntry";
import {ActivatedRoute} from "@angular/router";
import {IBlogEntry} from "../../interfaces/blogEntry";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {BlogService}from '../Service/blog-service'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blog: IBlogEntry;

  constructor(private route: ActivatedRoute) {
    this.blog = this.getBlog();
  }


  ngOnInit() {
    // this.blog = this.getBlog();
  }

  getBlog(): IBlogEntry {
    const blogIdentifier = String(this.route.snapshot.paramMap.get('identifier'));
    const authorIdentifier=String(this.route.snapshot.paramMap.get('author'));
    console.log(blogIdentifier);
    console.log(authorIdentifier);
    return mockBlogEntry();
  }

  protected readonly faUser = faUser;
}
