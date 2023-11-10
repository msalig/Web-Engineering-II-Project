import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IBlogEntry} from "../../interfaces/blogEntry";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {HttpClient} from "@angular/common/http";
import {GetblogsService} from "../Services/communication/getblogs.service";
import {ILocation} from "../../interfaces/Iocation";
import {UserService} from "../Services/communication/user.service";
import {LocationService} from "../Services/communication/location.service";
import {CommentService} from "../Services/communication/comment.service";
import {AuthorizationService} from "../Services/authorization.service";


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  blog: IBlogEntry | undefined;
  private blogId: string | undefined;
  private getblogsService: GetblogsService;
  private userService: UserService;
  private locationService: LocationService;
  private commentService: CommentService;
  protected readonly faUser = faUser;
  protected readonly AuthorizationService = AuthorizationService;
  titlecomment: string = '';
  review: number = 0;
  leaveComment: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.getblogsService = new GetblogsService(http);
    this.userService = new UserService(http);
    this.locationService = new LocationService(http);
    this.commentService = new CommentService(http);

    const blogIdentifier = String(this.route.snapshot.paramMap.get('identifier'));

    this.getblogsService.getBlogByIdentifier(blogIdentifier).subscribe(thisblog => {

      this.userService.getUserById(thisblog.authorId).subscribe(responseUser => {

          let author = this.userService.mapUser(responseUser[0])

          this.locationService?.getLocationById(thisblog.locationId).subscribe(responseLocation => {
            let location: ILocation = this.locationService.mapLocation(responseLocation)

            this.commentService?.getCommentsByBlogEntryId(thisblog._id).subscribe(responseComments => {

              let comments = this.commentService.mapCommentArray(responseComments);

              this.blogId = thisblog._id;

              this.blog = {
                author: author,
                blogentry: atob(thisblog.text),
                blogentryShort: atob(thisblog.textShort),
                comments: comments,
                displayname: thisblog.url,
                location: location,
                review: thisblog.review,
                tags: thisblog.tags,
                title: thisblog.title
              }
            })
          })
        }
      )
    })
  }

  sendComment() {
    // @ts-ignore
    if (this.blogId?.length > 1) {
      console.log("senden...")
      if (this.titlecomment.length > 4 && (this.leaveComment.length > 10 || (this.review >= 1 && this.review <= 5))) {
        this.commentService.sendComment({      // @ts-ignore
          authorId: localStorage.getItem('id'),  // @ts-ignore
          blogEntryId: this.blogId,
          title: this.titlecomment,
          text: this.leaveComment,
          review: 0
        }).subscribe(response => {
          if (response.review > 0 && response.review == this.review) {
            console.log('everything worked')
          }
        })
      } else
        console.log('something went wrong')
    }
  }

  replaceSpacesWithDashes(s: string) {
    return s.replace(/\s+/g, '-');
  }
}
