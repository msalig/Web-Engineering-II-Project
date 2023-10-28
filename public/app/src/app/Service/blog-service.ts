import {IBlogEntry} from "../../interfaces/blogEntry";
import {mockBlogEntry} from "../../MockData/mockblogEntry";

export class BlogService{




  getBlogByIdentifier(identifier:string):IBlogEntry{
    return mockBlogEntry();
  }




 // function getBlog():IBlogEntry{
 //  return MockBlogEntry();
 //  }
}
