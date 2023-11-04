import {Component, OnInit} from '@angular/core';
import {IBlogEntry} from "../../interfaces/blogEntry";
import {getBlogEntrys, getBlogEntrysByAuthor} from "../../MockData/mockblogEntrys";
import {faEdit, faUser} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorizationService} from "../Services/authorization.service";
// import {AuthenticationService} from "../Service/authentication.service";

@Component({
  selector: 'app-accountview',
  templateUrl: './accountview.component.html',
  styleUrls: ['./accountview.component.scss']
})
export class AccountviewComponent implements OnInit{








  filteredBlogEntrys: IBlogEntry[] = [];
  private blogEntrys: IBlogEntry[];
  protected readonly faUser = faUser;
  protected readonly faEdit = faEdit;
  userName: any;
  private _listFilter: string = '';

  protected readonly authorizationService = AuthorizationService;
  // private authorizationService:AuthorizationService|undefined;

  constructor(private route: ActivatedRoute, private router:Router) {
    this.blogEntrys = getBlogEntrys();
    // this.authorizationService=new AuthorizationService();
    this.filteredBlogEntrys = this.blogEntrys;
    this.userName="muss durch authentifizierung abgefragt werden";
  }


  ngOnInit() {

    // this.authorizationService.

    if(AuthorizationService._User==null)
      this.router.navigateByUrl('/login');
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.performFilter(value);
  }

  performFilter(filterBy: string): void {
    filterBy = filterBy.toLowerCase();
    this.filteredBlogEntrys = this.blogEntrys.filter((blog: IBlogEntry) =>
      blog.author.name.toLowerCase().includes(filterBy) || blog.title.toLowerCase().includes(filterBy) || blog.tags.toLocaleString().toLowerCase().includes(filterBy) || blog.location.country.toLowerCase().includes(filterBy) || blog.location.place.toLowerCase().includes(filterBy));
  }
  //
  // saveInfos(){
  //   console.log("save Infos");

  // }
  saveInfos() {

  }

  protected readonly AuthorizationService = AuthorizationService;
}
