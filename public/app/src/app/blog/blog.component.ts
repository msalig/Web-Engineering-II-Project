import {Component, OnInit} from '@angular/core';
import {getBlogEntrys} from "../../MockData/mockblogEntrys";
import {mockBlogEntry} from "../../MockData/mockblogEntry";
import {ActivatedRoute} from "@angular/router";
import {IBlogEntry} from "../../interfaces/blogEntry";

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
    const identifier = String(this.route.snapshot.paramMap.get('identifier'));
    return mockBlogEntry();
  }

}
