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
  showSidebar: boolean = true;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit() {
    this.sidebarService.onToggleLeftSidebar.subscribe(result => {
      this.showSidebar = result;
    });
  }

}
