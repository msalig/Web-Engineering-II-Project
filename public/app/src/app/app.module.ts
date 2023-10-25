import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";


import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from "@angular/forms";
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {NavbarComponent} from './navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {BlogsComponent} from './blogs/blogs.component';
import {RatingsComponent} from './ratings/ratings.component';
import {PreviewBlogComponent} from './preview-blog/preview-blog.component';
import {BlogComponent} from './blog/blog.component';
import {NotfoundComponent} from "./notfound/notfound.component";
// import {convertToStars} from "../assets/convert-to-stars.pipe";
import {AuthorsComponent} from "./authors/authors.component";
import {AuthorComponent} from "./author/author.component";

const myRoutes: Routes = [

  {
    path: '',
    pathMatch: "full",
    component: HomeComponent
  },
  {
    path: 'blogs',
    component: BlogsComponent
  },
  {
    path: 'blogs/newblog',
    component: BlogComponent
  },
  {
    path: 'blog/:author/:identifier',
    component: BlogComponent
  },
  {
    path: 'blogger',
    component: AuthorsComponent
  },
  {
    path: 'blogger/:author',
    component: AuthorComponent
  },


  {
    path: 'ratings',
    component: RatingsComponent
  }, {
    path: '**',
    component: NotfoundComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BlogsComponent,
    RatingsComponent,
    BlogComponent,
    AuthorsComponent,
    AuthorComponent

    // convertToStars,
  ],
  imports: [
    RouterModule.forRoot(myRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    // lbarModule,
    // general,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
