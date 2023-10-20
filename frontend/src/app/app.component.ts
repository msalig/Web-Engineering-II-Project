import {Component, OnInit} from '@angular/core';
import {IBlogEntry} from "../interfaces/blogEntry";
import {getBlogEntrys} from "../MockData/mockblogEntry";

var blogEntrys:IBlogEntry[];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend';

  ngOnInit() {
    blogEntrys=getBlogEntrys();
    console.log(blogEntrys);
  }







}

