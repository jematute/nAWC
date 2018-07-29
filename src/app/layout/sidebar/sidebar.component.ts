import { Component, OnInit } from '@angular/core';
import { SidebarService } from './sidebar.service';
import { LocalizationService } from '../../localization/localization.service';
import { ISidebarButton } from './buttons/ISidebarButton';
import { HomeButton } from './buttons/HomeButton';
import { InboxButton } from './buttons/InboxButton';
import { FavoritesButton } from './buttons/FavoritesButton';
import { SavedSearchesButton } from './buttons/SavedSearchesButton';
import { LibraryBrowserButton } from './buttons/LibraryBrowserButton';
import { FileGuideButton } from './buttons/FileGuideButton';
import { WorkAreasButton } from './buttons/WorkAreasButton';
import { Router } from '../../../../node_modules/@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit {

  shouldRun: boolean;
  events = [];
  showSidebar: boolean = true;
  activeMenu: string = "";

  buttons: Array<ISidebarButton> = [ 
    new HomeButton(), 
    new FavoritesButton(), 
    new SavedSearchesButton(), 
    new InboxButton(), 
    new LibraryBrowserButton(), 
    new FileGuideButton(), 
    new WorkAreasButton() 
  ];

  constructor(private sidebarService: SidebarService, private locale: LocalizationService, private router: Router) { }

  ngOnInit() {
    this.sidebarService.onToggleLeftSidebar.subscribe(result => {
      this.showSidebar = result;
    });
  }

  backToMenu() {
    this.activeMenu = "";
  }

  menuSelected(button: ISidebarButton) {
    if (button instanceof HomeButton) {
      this.router.navigate(['/home']);
      return;
    }
    this.activeMenu = button.label;
  }

}
