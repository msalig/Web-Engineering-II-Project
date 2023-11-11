import {Component} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  menu_icon_variable: boolean = false;

  menuVariable: boolean = false;

  openMenu() {
    this.menuVariable = !this.menuVariable;

    this.menu_icon_variable = !this.menu_icon_variable;
  }
}
