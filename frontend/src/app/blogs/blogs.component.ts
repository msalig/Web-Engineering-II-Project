import { Component } from '@angular/core';
import {getBlogEntrys} from "../../MockData/mockblogEntry";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent {

  protected readonly getBlogEntrys = getBlogEntrys;

}
