import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../sidebar/sidebar.service';
import { AuthService, LocalizationService } from 'projects/ui-api/src';

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
