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
import {response} from "express";



@Component({
  selector: 'app-accountview',
  templateUrl: './accountview.component.html',
  styleUrls: ['./accountview.component.scss']
})


export class AccountviewComponent implements OnInit {
  protected readonly AuthorizationService = AuthorizationService;


  private blogEntrys: IBlogEntry[] = [];
  private _filteredBlogEntrys: IBlogEntry[] = [];

  protected readonly faUser = faUser;
  protected readonly faEdit = faEdit;

  infoText: string='';
  passWord: string='';
  private _listFilter: string = '';
  private _nameVar = AuthorizationService.getUser().displayname;
  private _mailVar = AuthorizationService.getUser().email;


  private authorizationService:AuthorizationService
  private blogService: GetblogsService;
  private userService: UserService;
  private _locationService: LocationService;


  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.blogService = new GetblogsService(http);
    this.userService = new UserService(http);
    this._locationService = new LocationService(http);
    this.authorizationService = new AuthorizationService(http);
    this._filteredBlogEntrys = this.blogEntrys;
  }

  ngOnInit() {
    console.log("check if already logged in...")
    console.log(AuthorizationService._User.username)
    if (AuthorizationService.getUser().username == '')
      this.router.navigateByUrl('/login');
    this.getBlogs()

  }

  getBlogs() {
    console.log(AuthorizationService.getUser())
    this.blogService.getBlogByAuthor(AuthorizationService.getUser().username).subscribe(response => {
      console.log(response)
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



  saveInfos() {

    if(AuthorizationService.getUser().displayname != this.nameVar || AuthorizationService.getUser().email!=this.mailVar || this.passWord!='') {
      this.authorizationService.updateCredentials({
        _id: AuthorizationService.getUser()._id,
        password: this.passWord,
        displayname: this.nameVar,
        username: this.userService.getDisplayName(this.nameVar),
        email: this.mailVar
      }).subscribe(response => {
        AuthorizationService.setUser(response);
      })
      this.infoText="You changed your character! Celebrate it with a vacation!"

    }
    else {
      this.infoText="You are the same Person. If you want to change your character we would recommend a vacation."
    }
  }

  logOut(){
    localStorage.clear()
    this.router.navigateByUrl("/login");
  }




  set nameVar(value: string) {
    this._nameVar = value;
  }

  set mailVar(value: string) {
    this._mailVar = value;
  }
  get nameVar(): string {
    return this._nameVar;
  }

  get mailVar(): string {
    return this._mailVar;
  }


}
