import {Component, OnInit} from '@angular/core';
import {IBlogEntry} from "../interfaces/blogEntry";
import {getBlogEntrys} from "../MockData/mockblogEntrys";
import {IUser} from "../interfaces/user";
import {initFlowbite} from 'flowbite';

var blogEntrys: IBlogEntry[];
var currentUser: IUser;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  ngOnInit() {
    initFlowbite();
    blogEntrys = getBlogEntrys();

    //console.log(blogEntrys);
  }
}
