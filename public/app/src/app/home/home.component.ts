import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private http:HttpClient) {}



  ngOnInit() {
    console.log("Versuche Verbindung aufzubauen....");
    this.http.get('http://localhost:4040/api').subscribe(response => {
      console.log("received message: ");
      console.log(response);
    })
  }

}
