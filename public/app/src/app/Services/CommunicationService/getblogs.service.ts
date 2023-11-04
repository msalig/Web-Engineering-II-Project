import { Injectable } from '@angular/core';
import {IBlogEntry} from "../../../interfaces/blogEntry";
import {IBlogEntryFromBackend} from "../../../interfaces/IBlogEntryFromBackend";
import {HttpClient} from "@angular/common/http";
import {number} from "joi";

@Injectable({
  providedIn: 'root'
})
export class GetblogsService {

  constructor(private http: HttpClient) { }


  public async getBlogEntrys(){
    let blogs: IBlogEntry[]=[];
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
              blogentryShort: blogBE.text,
              blogentry: blogBE.text,
              comments: [],
              tags: blogBE.tags,
              review: blogBE.review,
            }
            blogs.push(blog);
          }
        )
         console.log("in FUnktoin")
        console.log(blogs);
        return blogs;
  })
    return blogs;
  }




  public getBlogByID(id:string):IBlogEntry{
    let blogEntry:IBlogEntry ={
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
  this.http.get<IBlogEntryFromBackend>('http://localhost:3000/api/blogEntries/'+id)
    .subscribe(response => {

      blogEntry={
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
  }}
