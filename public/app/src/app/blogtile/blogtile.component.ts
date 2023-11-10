import {Component, Input} from '@angular/core';
import {IBlogEntry} from "../../interfaces/blogEntry";
import {faComment, faStar, faUser} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-blogtile',
  templateUrl: './blogtile.component.html',
  styleUrls: ['./blogtile.component.scss']
})
export class BlogtileComponent {

  @Input()
  blog!: IBlogEntry;
  protected readonly faUser = faUser;
  protected readonly faComment = faComment;
  protected readonly faStar = faStar;

  replaceSpacesWithDashes(inputString: string): string {
    return inputString.replace(/\s+/g, '-');
  }
}
