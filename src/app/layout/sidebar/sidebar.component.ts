import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  shouldRun: boolean;
  events = [];

  constructor(sidebarService: SidebarService) { }

  ngOnInit() {
  }

}
