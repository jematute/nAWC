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
  constructor(private auth: AuthService, private locale: LocalizationService, private router: Router, private sidebar: SidebarService) { }

  toggleSidebar() {
    this.sidebar.toggleSidebar();
  }

  ngOnInit() {
  }

}