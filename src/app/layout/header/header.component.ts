import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/auth.service';
import { LocalizationService } from '../../localization/localization.service';
import { Router } from '@angular/router';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService, public locale: LocalizationService, public router: Router, private sidebar: SidebarService) { }

  toggleSidebar() {
    this.sidebar.toggleSidebar();
  }

  ngOnInit() {
  }

}