import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  // constructor() { }

  menu_icon_variable: boolean = false;

  menuVariable: boolean = false;
  //
  // ngOnInit(): void {
  //
  // }

  openMenu() {

    this.menuVariable =! this.menuVariable;

    this.menu_icon_variable =! this.menu_icon_variable;

  }
}
