import { Injectable } from '@angular/core';
import {IBlogEntry} from "../../../interfaces/blogEntry";
import {IBlogEntryFromBackend, IBlogEntryFromBackendShort} from "../../../interfaces/IBlogEntryFromBackend";
import {HttpClient} from "@angular/common/http";
import {number} from "joi";
import {Observable} from "rxjs";
import {IUser} from "../../../interfaces/user";
import {UserService} from "./user.service";
import {response} from "express";
import {coerceStringArray} from "@angular/cdk/coercion";

@Injectable({
  providedIn: 'root'
})
export class GetblogsService {
    private userService:UserService|undefined;

  constructor(private http: HttpClient) {
    this.userService = new UserService(http)
  }

  getBlogsShort(): Observable<IBlogEntryFromBackendShort[]> {
    return this.http.get<IBlogEntryFromBackendShort[]>("http://localhost:3000/api/blogEntries/short");
  }

  getBlogById(id:string):Observable<IBlogEntryFromBackend>{
    return this.http.get<IBlogEntryFromBackend>("http://localhost:3000/api/blogEntries/");
  }

  // getBlogByID(id: string): IBlogEntry {
  //   let blogEntry: IBlogEntry = {
  //     author: {
  //       displayname: '',
  //       name: '',
  //       mail: '',
  //       publishedblogs: 0
  //     },
  //     blogentry: "",
  //     blogentryShort: "",
  //     comments: [],
  //     displayname: "",
  //     location: {
  //       country: '',
  //       place: '',
  //       coordinates: {
  //         x: 0,
  //         y: 0
  //       }
  //     },
  //     review: 0,
  //     tags: [],
  //     title: ""
  //   };
  //   this.http.get<IBlogEntryFromBackend>('http://localhost:3000/api/blogEntries/' + id)
  //     .subscribe(response => {
  //
  //       blogEntry = {
  //         displayname: response._id.toString(),
  //         author: {
  //           displayname: "kreuzfahrtfan",
  //           name: "cruiselover222",
  //           mail: "cruiselover222@example.com",
  //           publishedblogs: 7,
  //         },
  //         title: response.title,
  //         location: {
  //           "country": "Deutschland",
  //           "place": "Berlin",
  //           "coordinates": {
  //             "x": 52.5200,
  //             "y": 13.4050
  //           }
  //         },
  //         blogentryShort: response.text,
  //         blogentry: response.text,
  //         comments: [],
  //         tags: response.tags,
  //         review: response.review
  //       };
  //     })
  //   return blogEntry
  // }


  mapBlogShort(blog: IBlogEntryFromBackendShort)
  {

    let author:IUser={
      displayname:'string',
      name:'string',
      mail: 'string',
      publishedblogs:5,
    }

    return this.userService?.getUserById(blog.authorId)


    //   .subscribe(response =>{
    //   author=<IUser>this.userService?.mapUser(response)
    //   console.log(response);
    //   console.log(author);
    //   return{
    //     author: author,
    //     blogentry: '',
    //     blogentryShort: atob(blog.textShort),
    //     comments: [],
    //     displayname: blog.url,
    //     location: {
    //       country: '',
    //       place: '',
    //       coordinates: {
    //         x: 0,
    //         y: 0
    //       }
    //     },
    //     review: blog.review,
    //     tags: blog.tags,
    //     title: blog.title
    //
    //   }
    //   console.log(author);
    // })





  }


}
