import { Component } from '@angular/core';
import {getBlogEntrys} from "../../MockData/mockblogEntry";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {

    protected readonly getBlogEntrys = getBlogEntrys;
  protected readonly location = location;
}
