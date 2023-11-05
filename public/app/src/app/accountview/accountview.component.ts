import {Component, OnInit} from '@angular/core';
import {IBlogEntry} from "../../interfaces/blogEntry";
import {getBlogEntrys, getBlogEntrysByAuthor} from "../../MockData/mockblogEntrys";
import {faEdit, faUser} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorizationService} from "../Services/authorization.service";
import {GetblogsService} from "../Services/communication/getblogs.service";
import {HttpClient} from "@angular/common/http";
import {IUser} from "../../interfaces/user";
import {ILocation} from "../../interfaces/Iocation";
import {UserService} from "../Services/communication/user.service";
import {LocationService} from "../Services/communication/location.service";



@Component({
  selector: 'app-accountview',
  templateUrl: './accountview.component.html',
  styleUrls: ['./accountview.component.scss']
})


export class AccountviewComponent implements OnInit {

  private _filteredBlogEntrys: IBlogEntry[] = [];

  private blogEntrys: IBlogEntry[] = [];
  protected readonly faUser = faUser;
  protected readonly faEdit = faEdit;
  private _listFilter: string = '';
  private blogService: GetblogsService;

  private userService:UserService;
  private _locationService:LocationService;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.blogService = new GetblogsService(http);
    this.userService=new UserService(http);
    this._locationService=new LocationService(http);
    this.getBlogs()
    this._filteredBlogEntrys = this.blogEntrys;
  }

  getBlogs() {
    this.blogService.getBlogByAuthor(AuthorizationService._User.name).subscribe(response =>{
      response.forEach(blog => {

        this.userService.getUserById(blog.authorId)
          .subscribe(responseUser => {

              let author = <IUser>this.userService.mapUser(responseUser[0])

              this._locationService?.getLocationById(blog.locationId)
                .subscribe(responseLocation => {
                  let location: ILocation = this._locationService.mapLocation(responseLocation)


                  this.blogEntrys.push({
                    author: author,
                    blogentry: '',
                    blogentryShort: atob(blog.textShort),
                    comments: [],
                    displayname: blog.url,
                    location: location,
                    review: blog.review,
                    tags: blog.tags,
                    title: blog.title

                  })

                })
            }
          );
      })
    })
  }

  ngOnInit() {
    console.log("check if already logged in...")
    console.log(AuthorizationService._User.name)
    if (AuthorizationService._User.name == '')
      this.router.navigateByUrl('/login');
  }


  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.performFilter(value);
  }

  get filteredBlogEntrys(): IBlogEntry[] {
    return this._filteredBlogEntrys;
  }

  performFilter(filterBy: string): void {
    filterBy = filterBy.toLowerCase();
    this._filteredBlogEntrys = this.blogEntrys.filter((blog: IBlogEntry) =>
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
