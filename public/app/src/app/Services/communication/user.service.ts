import {Injectable} from '@angular/core';
import {IUser} from "../../../interfaces/user";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IAuthorFromBackend, ISendUserBackendRegister, IUserFromBackend} from "../../../interfaces/userfrombackend";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  postNewUser(user: IUserFromBackend) {
    return this.http.post("http://localhost:3000/api/users/", user);
    //
    // addHero(hero: Hero): Observable<Hero> {
    //   return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
    //     .pipe(
    //       catchError(this.handleError('addHero', hero))
    //     );
    // }
  }

  getUserById(id: string): Observable<IUserFromBackend[]> {
    return this.http.get<IUserFromBackend[]>(`http://localhost:3000/api/users/${id}`);
  }

  getUsers(): Observable<IUserFromBackend[]> {
    return this.http.get<IUserFromBackend[]>("http://localhost:3000/api/users");
  }

  getUserByUserName(userName: string): Observable<IUserFromBackend> {
    return this.http.get<IUserFromBackend>(`http://localhost:3000/api/users/byUsername/${userName}`)
  }

  deleteUser(id: string) {
    return this.http.delete<ISendUserBackendRegister>(`http://localhost:3000/api/users/${id}`)
  }

  mapAuthor(author: IUserFromBackend): IUser {
    return {
      displayname: author.username,
      mail: author.email,
      name: author.displayname,
      publishedblogs: author.countBlogEntries
    }
  }

  mapUser(user: IUserFromBackend): IUser {
    return {
      displayname: user.displayname,
      mail: user.email,
      name: user.username,
      publishedblogs: user.countBlogEntries
    }
  }

  getDisplayName(name: string): string {
    return name.toLowerCase().replace(/ /g, "_");
  }
}
