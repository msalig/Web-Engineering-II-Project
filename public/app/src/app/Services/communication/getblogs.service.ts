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
import {ILocation} from "../../../interfaces/Iocation";

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
    return this.http.get<IBlogEntryFromBackend>("http://localhost:3000/api/blogEntries/"+id);
  }

  getBlogByAuthor(displayName:string){
      return this.http.get<IBlogEntryFromBackend[]>("http://localhost:3000/api/blogEntries/byAuthor/"+displayName);
  }

    getBlogByIdentifier(identifier:string){
        return this.http.get<IBlogEntryFromBackend>("http://localhost:3000/api/blogEntries/byUrl/"+ identifier);
    }

}
