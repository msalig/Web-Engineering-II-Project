import { Component } from '@angular/core';
import {getBlogEntrys} from "../../MockData/mockblogEntrys";
import {faCoffee, faComment, faUser} from "@fortawesome/free-solid-svg-icons";
// import {convertToStars} from "../../assets/convert-to-stars.pipe";

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
  protected readonly faUser = faUser;
    // protected readonly convertToStars = convertToStars;
    // protected readonly convertToStars = convertToStars;
}
