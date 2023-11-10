import {Injectable} from '@angular/core';
import {
  IBlogEntryFromBackend,
  IBlogEntryFromBackendShort,
  IBlogEntryPutPost
} from "../../../interfaces/IBlogEntryFromBackend";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class GetblogsService {
  private userService: UserService | undefined;

  constructor(private http: HttpClient) {
    this.userService = new UserService(http)
  }

  getBlogsShort(): Observable<IBlogEntryFromBackendShort[]> {
    return this.http.get<IBlogEntryFromBackendShort[]>("http://localhost:3000/api/blogEntries/short");
  }

  getBlogById(id: string): Observable<IBlogEntryFromBackend> {
    return this.http.get<IBlogEntryFromBackend>("http://localhost:3000/api/blogEntries/" + id);
  }

  getBlogByAuthor(displayName: string) {
    return this.http.get<IBlogEntryFromBackend[]>("http://localhost:3000/api/blogEntries/byAuthor/" + displayName);
  }

  getBlogByIdentifier(identifier: string) {
    return this.http.get<IBlogEntryFromBackend>("http://localhost:3000/api/blogEntries/byUrl/" + identifier);
  }

  putBlogEntry(blog: IBlogEntryPutPost, id: string) {
    return this.http.put<IBlogEntryPutPost>('http://localhost:3000/api/blogEntries/' + id, blog)
  }

  postBlogEntry(blog: IBlogEntryPutPost) {
    return this.http.post<IBlogEntryPutPost>('http://localhost:3000/api/blogEntries', blog)
  }
}
