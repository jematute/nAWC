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
import { Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';
import { LibModel } from '../../classes/libmodel';
import { GridService } from '../../results/grid/grid.service';
import { SearchService } from '../../search/search.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('100ms ease-in', style({transform: 'translateX(0%)'}))
      ])
    ])
  ]
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

  constructor(private sidebarService: SidebarService, public locale: LocalizationService, private router: Router, private gridService: GridService, private searchService: SearchService) { }

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
      this.router.navigate(['layout/home']);
      return;
    }
    this.activeMenu = button.label;
  }

  librarySelected(library: LibModel) {
    if (library.libId) {
      const selectedLibrary = library as LibModel;
      this.searchService.setSearchCriteria("SCHEMA_S_LIBID", selectedLibrary.libId);
      this.gridService.dataService = this.searchService;
      this.gridService.reloadGrid();
    }
  }

}
