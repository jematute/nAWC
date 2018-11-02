import { Component, OnInit } from '@angular/core';
import { AuthService, LocalizationService } from 'projects/ui-api/src';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.less']
})
export class UserMenuComponent implements OnInit {

  constructor(public auth: AuthService, public locale: LocalizationService) { }

  showUserMenu = false;

  ngOnInit() {
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  closeUserMenu() {
    this.showUserMenu = false;
  }

  logOut() {
    this.auth.logOut().subscribe(() => {
    });
  }

}
