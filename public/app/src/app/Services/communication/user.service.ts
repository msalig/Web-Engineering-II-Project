import { Injectable } from '@angular/core';
import {IUser} from "../../../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {IAuthorFromBackend, IUserFromBackend} from "../../../interfaces/userfrombackend";
import {IBlogEntry} from "../../../interfaces/blogEntry";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  postNewUser(user:IUserFromBackend){

    return this.http.post("http://localhost:3000/api/users/",user);

    //
    // addHero(hero: Hero): Observable<Hero> {
    //   return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
    //     .pipe(
    //       catchError(this.handleError('addHero', hero))
    //     );
    // }
  }

  getUserById(id:string):Observable<IUserFromBackend> {
    return this.http.get<IUserFromBackend>("http://localhost:3000/api/users/" + id);
  }

  getUsers():Observable<IAuthorFromBackend[]>{
    return this.http.get<IAuthorFromBackend[]>("http://localhost:3000/api/users");
  }

  mapAuthor(author:IAuthorFromBackend):IUser{
    return {
      displayname: author.username,
      mail: '',
      name: author.displayname,
      publishedblogs: 3
    }
  }

  mapUser(user:IUserFromBackend):IUser{
    return{
      displayname: user.displayName,
      mail: user.email,
      name: user.username,
      publishedblogs: 3
    }
  }




}
