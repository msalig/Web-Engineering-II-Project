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
import {BlogComponent} from './blog/blog.component';
import {NotfoundComponent} from "./notfound/notfound.component";
import {AuthorsComponent} from "./authors/authors.component";
import {AuthorComponent} from "./author/author.component";
import {BlogtileComponent} from "./blogtile/blogtile.component";
import {AccountviewComponent} from './accountview/accountview.component';
import {EditblogComponent} from './editblog/editblog.component'
import {TagsearchComponent} from './tagsearch/tagsearch.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component'


const myRoutes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: '/blogs'
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
    path: 'blog/:identifier',
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
    path: 'my-account',
    component: AccountviewComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'editblog/:blogtitle',
    component: EditblogComponent
  },
  {
    path: 'blogs/search/tags/:tag',
    component: TagsearchComponent
  },
  {
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
    AuthorComponent,
    BlogtileComponent,
    AccountviewComponent,
    EditblogComponent,
    TagsearchComponent,
    LoginComponent,
    RegisterComponent,
    // StarPipe,
    /**/
    // ConvertToStarsPipe,
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
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
