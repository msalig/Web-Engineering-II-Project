import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICommentFromBackend, ICommentSendBackendPut} from "../../../interfaces/ICommentFromBackend";
import {IComment} from "../../../interfaces/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  getCommentById(id: string): Observable<ICommentFromBackend> {
    return this.http.get<ICommentFromBackend>("http://localhost:3000/api/comments/" + id)
  }

  getCommentsByBlogEntryId(id: string): Observable<ICommentFromBackend[]> {
    return this.http.get<ICommentFromBackend[]>("http://localhost:3000/api/comments/byBlogEntry/" + id)
  }

  sendComment(comment: ICommentSendBackendPut) {
    return this.http.post<ICommentSendBackendPut>('http://localhost:3000/api/comments', comment)
  }

  deleteComment(id: string) {
    return this.http.delete(`http://localhost:3000/api/comments/${id}`, {observe: 'response'})
  }

  mapComment(comment: ICommentFromBackend): IComment {
    return {
      commentid: comment._id,
      author: comment.author,
      title: comment.title,
      comment: comment.text,
      review: comment.review
    }
  }

  mapCommentArray(commentsFromBackend: ICommentFromBackend[]): IComment[] {
    let comments: IComment[] = [];
    commentsFromBackend.forEach(comment => comments.push(this.mapComment(comment)));
    return comments;
  }
}
