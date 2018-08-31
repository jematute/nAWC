import { Component, OnInit, Pipe } from '@angular/core';
import { LocalizationService } from '../localization/localization.service';
import { CheckInButton } from './buttons/check-in-button';
import { Tab } from './classes/tab';
import { CheckInService } from '../commands/check-in/check-in.service';
import { ToolbarButton } from './classes/toolbarbutton';
import { GridService } from '../results/grid/grid.service';
import { SelectionItem } from '../classes/selectionitem';
import { MatDialog } from '@angular/material';
import { trigger, state, style, transition, animate, useAnimation } from '@angular/animations';
import { bounce, zoomIn, zoomOut } from 'ng-animate';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less'],
  animations: [
    trigger('zoomIn', [transition(':enter', useAnimation(zoomIn, { params: { timing: .5, delay: 0 } }))])
  ]
})
export class ToolbarComponent implements OnInit {

  constructor(
    public locale: LocalizationService,
    private gridService: GridService,
    private dialog: MatDialog
  ) { }

  showToolbar: boolean = true;
  tabs: Array<Tab>;
  checkInButton: CheckInButton = new CheckInButton();

  activeTab: Tab;

  tabClicked(tab) {
    this.activeTab.active = false;
    tab.active = true;
    this.activeTab = tab;
  }

  toolbarToggled() {

  }

  ngOnInit() {

    this.initButtons();
    this.initTabs(); 
    this.gridService.onSelectionChanged.subscribe(items => {
      this.updateEnables(items);
    });
  }

  toolbarButtonClicked(button: ToolbarButton) {
    button.onClick(this.gridService.getSelectedRows());
  }

  initTabs() {
    const homeTab = new Tab();
    homeTab.name = this.locale.resourceStrings["HOME"];
    homeTab.active = true;
    homeTab.items = [ this.checkInButton ];

    const searchTab = new Tab();
    searchTab.name = this.locale.resourceStrings["SEARCH"];
    searchTab.items = [ ];

    const documentTab = new Tab();
    documentTab.name = this.locale.resourceStrings["DOCUMENT"];
    documentTab.items = [ ];

    const workFlowTab = new Tab();
    workFlowTab.name = this.locale.resourceStrings["WORKFLOW"];
    workFlowTab.items = [ ];

    this.tabs = [ homeTab, searchTab, documentTab, workFlowTab ];
    this.activeTab = homeTab;
  }

  initButtons() {
    //check in
    this.checkInButton.text = this.locale.resourceStrings["TOOLBAR_CHECK_IN"];
    this.checkInButton.popupText = this.locale.resourceStrings["CHECK_IN_SELECTED_DOCUMENT"];
    this.checkInButton.dialog = this.dialog;
    this.checkInButton.enabled = true;
  }

  //update if the button should be enabled or disabled
  updateEnables(selectionItems: Array<SelectionItem>) {
    //do something for enables
  }

}

@Pipe({
  name: 'hidepipe',
})
export class HidePipe {

  transform(objects: any[]): any[] {
      if(objects) {
          return objects.filter(object => {
              return object.hide === false;
          });
      }
  }

}
