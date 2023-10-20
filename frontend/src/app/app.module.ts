import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BlogsComponent } from './blogs/blogs.component';
import { RatingsComponent } from './ratings/ratings.component';


const myRoutes: Routes =[
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'blogs',
    component:BlogsComponent
  },
  {
    path:'ratings',
    component:RatingsComponent
  }

];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BlogsComponent,
    RatingsComponent
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
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
