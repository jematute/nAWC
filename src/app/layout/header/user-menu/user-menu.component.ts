import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../login/auth.service';
import { LocalizationService } from '../../../localization/localization.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.less']
})
export class UserMenuComponent implements OnInit {

  constructor(public auth: AuthService, public locale: LocalizationService) { }

  showUserMenu: boolean = false;

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
