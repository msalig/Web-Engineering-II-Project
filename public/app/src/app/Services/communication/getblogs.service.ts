import { Injectable } from '@angular/core';
import {IBlogEntry} from "../../../interfaces/blogEntry";
import {IBlogEntryFromBackend, IBlogEntryFromBackendShort} from "../../../interfaces/IBlogEntryFromBackend";
import {HttpClient} from "@angular/common/http";
import {number} from "joi";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetblogsService {

  constructor(private http: HttpClient) {
  }

  getBlogsShort(): Observable<IBlogEntryFromBackendShort[]> {
    return this.http.get<IBlogEntryFromBackendShort[]>("http://localhost:3000/api/blogEntries/short");
  }



  getBlogByID(id: string): IBlogEntry {
    let blogEntry: IBlogEntry = {
      author: {
        displayname: '',
        name: '',
        mail: '',
        publishedblogs: 0
      },
      blogentry: "",
      blogentryShort: "",
      comments: [],
      displayname: "",
      location: {
        country: '',
        place: '',
        coordinates: {
          x: 0,
          y: 0
        }
      },
      review: 0,
      tags: [],
      title: ""
    };
    this.http.get<IBlogEntryFromBackend>('http://localhost:3000/api/blogEntries/' + id)
      .subscribe(response => {

        blogEntry = {
          displayname: response._id.toString(),
          author: {
            displayname: "kreuzfahrtfan",
            name: "cruiselover222",
            mail: "cruiselover222@example.com",
            publishedblogs: 7,
          },
          title: response.title,
          location: {
            "country": "Deutschland",
            "place": "Berlin",
            "coordinates": {
              "x": 52.5200,
              "y": 13.4050
            }
          },
          blogentryShort: response.text,
          blogentry: response.text,
          comments: [],
          tags: response.tags,
          review: response.review
        };
      })
    return blogEntry
  }


  mapBlogShort(blog: IBlogEntryFromBackendShort):IBlogEntry
  {
    return{
      author: {
        displayname: '',
        name: '',
        mail: '',
        publishedblogs: 0
      },
      blogentry: '',
      blogentryShort: atob(blog.textShort),
      comments: [],
      displayname: blog.url,
      location: {
        country: '',
        place: '',
        coordinates: {
          x: 0,
          y: 0
        }
      },
      review: blog.review,
      tags: blog.tags,
      title: blog.title

    }
  }


}
