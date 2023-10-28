import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {mockBlogEntry} from "../../MockData/mockblogEntry";



@Component({
  selector: 'app-editblog',
  templateUrl: './editblog.component.html',
  styleUrls: ['./editblog.component.scss']
})
export class EditblogComponent {
  editableBlogEntry: any;
  editableBlogtitleEntry: any;


  constructor(private _route: ActivatedRoute) {
    this.getInfos();
  }

  getInfos() {
    const blogName= String(this._route.snapshot.paramMap.get('blogtitle'));
    const blogEntry = mockBlogEntry();
    this.editableBlogEntry=blogEntry.blogentry;
    this.editableBlogtitleEntry=blogEntry.title;
  }

  saveInfos(){
    console.log(this.editableBlogtitleEntry);
    console.log(this.editableBlogEntry);
  }



}
