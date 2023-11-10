import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ILocation} from "../../interfaces/Iocation";
import {GetblogsService} from "../Services/communication/getblogs.service";
import {UserService} from "../Services/communication/user.service";
import {LocationService} from "../Services/communication/location.service";
import {HttpClient} from "@angular/common/http";
import {IBlogEntryFromBackend, IBlogEntryPutPost} from "../../interfaces/IBlogEntryFromBackend";
import {AuthorizationService} from "../Services/authorization.service";


@Component({
  selector: 'app-editblog',
  templateUrl: './editblog.component.html',
  styleUrls: ['./editblog.component.scss']
})
export class EditblogComponent {
  editableBlogEntry: any;
  editableBlogtitleEntry: any;
  infotext: string = '';
  private getblogsService: GetblogsService;
  private userService: UserService;
  private locationService: LocationService;
  private blogId: string | undefined;
  private blog: IBlogEntryFromBackend | undefined;
  private locationBefore: ILocation | undefined;
  editBlockLocation: string | undefined;
  editBlockCountry: string | undefined;
  editBlockCoordinatesX: number | undefined;
  editBlockCoordinatesY: number | undefined;
  editBlockTags: string[] | undefined;
  private _isupdate: boolean = false;

  constructor(private _route: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.getblogsService = new GetblogsService(http);
    this.userService = new UserService(http);
    this.locationService = new LocationService(http);

    this.getInfos();
  }

  getInfos() {
    const blogName = String(this._route.snapshot.paramMap.get('blogtitle'));

    if (blogName != 'newBlog') {
      this._isupdate = true;

      this.getblogsService.getBlogByIdentifier(blogName).subscribe(thisblog => {
          this.blogId = thisblog._id;

          this.userService.getUserById(thisblog.authorId).subscribe(responseUser => {

            let author = this.userService.mapUser(responseUser[0])

            this.locationService?.getLocationById(thisblog.locationId).subscribe(responseLocation => {
              let location: ILocation = this.locationService.mapLocation(responseLocation)
              this.locationBefore = location;

              this.editableBlogtitleEntry = thisblog.title;
              this.infotext = atob(thisblog.textShort);
              this.editBlockLocation = location.place;
              this.editBlockCountry = location.country;
              this.editBlockCoordinatesX = location.coordinates.x;
              this.editBlockCoordinatesY = location.coordinates.y;
              this.editBlockTags = thisblog.tags;
              this.editableBlogEntry = atob(thisblog.text)
            })
          })
        }
      )
    } else {
      this._isupdate = false
    }
  }

  saveInfos() {
    console.log('url:')
    console.log(this.userService.getDisplayName(this.editableBlogtitleEntry))

    this.locationService.postLocation({      // @ts-ignore
      country: this.editBlockCountry,// @ts-ignore
      place: this.editBlockLocation,// @ts-ignore
      lat: this.editBlockCoordinatesX,// @ts-ignore
      lon: this.editBlockCoordinatesY
    }).subscribe(result => {

      let update: IBlogEntryPutPost = {
        authorId: AuthorizationService.getUser()._id,
        title: this.editableBlogtitleEntry,
        url: this.editableBlogtitleEntry.toLowerCase().replace(/ /g, "-"),
        locationId: result._id,
        text: btoa(this.editableBlogEntry),
        textShort: btoa(this.infotext),
        review: 0,// @ts-ignore
        tags: this.stringToArray(this.editBlockTags),
        comments: []
      }

      if (this._isupdate) {
        // @ts-ignore
        this.getblogsService.putBlogEntry(update, this.blogId).subscribe(response => {
          if (response.authorId == AuthorizationService.getUser()._id)
            this.router.navigateByUrl("/my-account")
        })
      } else {
        this.getblogsService.postBlogEntry(update).subscribe(response => {
          if (response.authorId == AuthorizationService.getUser()._id)
            this.router.navigateByUrl("/my-account")
        })
      }
    })
  }

  stringToArray(inputString: string): string[] {
    const stringArray = inputString.split(',');

    const trimmedArray = stringArray.map((item) => item.trim());

    return trimmedArray;
  }

  get isupdate(): boolean {
    return this._isupdate;
  }

  discardBlogEdit() {
    this.router.navigateByUrl("/my-account")
  }
}
