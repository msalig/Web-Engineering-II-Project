import { Component } from '@angular/core';
import {getBlogEntrys} from "../../MockData/mockblogEntrys";
import {faCoffee, faComment} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent {

  protected readonly getBlogEntrys = getBlogEntrys;

  protected readonly location = location;
  protected readonly faCoffee = faCoffee;
  protected readonly faComment = faComment;
}
