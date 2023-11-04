import {Component, Input, OnInit} from '@angular/core';
import {getBlogEntrys, getBlogEntrysByAuthor} from "../../MockData/mockblogEntrys";
import {faComment, faUser} from "@fortawesome/free-solid-svg-icons";
import {IBlogEntry} from "../../interfaces/blogEntry";
import {ActivatedRoute} from "@angular/router";
import {filter, map} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IBlogEntryFromBackend} from "../../interfaces/IBlogEntryFromBackend";
import {IUser} from "../../interfaces/user";
import {ILocation} from "../../interfaces/Iocation";
import {IComment} from "../../interfaces/comment";
import {GetblogsService} from "../Services/communication/getblogs.service";
import {UserService} from "../Services/communication/user.service";
import {LocationService} from "../Services/communication/location.service";


@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})

export class BlogsComponent {

  filteredBlogEntrys: IBlogEntry[] = [];
  protected readonly location = location;
  protected readonly faComment = faComment;
  protected readonly faUser = faUser;
  private blogEntrys: IBlogEntry[] = [];
  private backendRespond: IBlogEntryFromBackend[] | undefined;
  private _listFilter: string = '';
  private getblogsService: GetblogsService | undefined
  private userService: UserService | undefined
  private locationService: LocationService | undefined


  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.getblogsService = new GetblogsService(http);
    this.userService = new UserService(http);
    this.locationService = new LocationService(http);

    this.getblogsService.getBlogsShort().subscribe(response =>
      response.forEach(blog => {

        this.userService?.getUserById(blog.authorId)
          .subscribe(responseUser => {
              let author = <IUser>this.userService?.mapUser(responseUser)


              this.locationService?.getLocationById(blog.locationId)
                .subscribe(responseLocation => {
                  console.log(responseLocation)
                  // @ts-ignore
                  let location: ILocation = this.locationService.mapLocation(responseLocation)


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

              console.log(author);
            }
          );
      }))


    this.filteredBlogEntrys = this.blogEntrys;
  }


  get listFilter(): string {
    return this._listFilter;
  }


  set listFilter(value: string) {
    this._listFilter = value;
    this.performFilter(value);
  }


  getBlogEntrys(): IBlogEntry[] {

    //if it is part of the author-page
    const authorIdentifier = String(this.route.snapshot.paramMap.get('author'))
    if (authorIdentifier.length != 4) {
      console.log("Author");
      console.log(authorIdentifier.length);
      return getBlogEntrysByAuthor(authorIdentifier);
    }

    //if it is part of the search for tags-page
    const tagIdentifier = String(this.route.snapshot.paramMap.get('tag'))
    if (tagIdentifier.length == 120) {
      console.log('tagIdentifier');
      return getBlogEntrys();
    }


    //if it is part of the regular blogs-page
    let blogs: IBlogEntry[] = [];
    console.log("Versuche Verbindung aufzubauen....");
    this.http.get<IBlogEntryFromBackend[]>('http://localhost:3000/api/blogEntries/')
      .subscribe(response => {
        response.forEach(blogBE => {
            let blog: IBlogEntry = {
              displayname: blogBE._id.toString(),
              author: {
                displayname: "kreuzfahrtfan",
                name: "cruiselover222",
                mail: "cruiselover222@example.com",
                publishedblogs: 7,
              },
              title: blogBE.title,
              location: {
                "country": "Deutschland",
                "place": "Berlin",
                "coordinates": {
                  "x": 52.5200,
                  "y": 13.4050
                }
              },
              blogentryShort: atob(blogBE.text),
              blogentry: atob(blogBE.text),
              comments: [],
              tags: blogBE.tags,
              review: blogBE.review,
            }
            blogs.push(blog);
          }
        )
        console.log(blogs);


      })
    return blogs;
  }

  performFilter(filterBy: string): void {
    filterBy = filterBy.toLowerCase();
    this.filteredBlogEntrys = this.blogEntrys.filter((blog: IBlogEntry) =>
      blog.author.name.toLowerCase().includes(filterBy) || blog.title.toLowerCase().includes(filterBy) || blog.tags.toLocaleString().toLowerCase().includes(filterBy) || blog.location.country.toLowerCase().includes(filterBy) || blog.location.place.toLowerCase().includes(filterBy));
  }
}
