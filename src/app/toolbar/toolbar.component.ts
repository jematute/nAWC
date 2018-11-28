import { Component, OnInit, Pipe, ViewChild, ViewContainerRef, Compiler } from '@angular/core';
import { MatDialog } from '@angular/material';
import { trigger, state, style, transition, animate, useAnimation } from '@angular/animations';
import { bounce, zoomIn, zoomOut } from 'ng-animate';
import { PluginsService } from '../plugins/plugins.service';
import { ToolbarService, LocalizationService, GridService, SelectionItem, ToolbarButton, Tab, CheckInButton } from 'projects/ui-api/src';
import { TestExtended } from 'projects/ui-api/src';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less'],
  animations: [
    trigger('zoomIn', [transition(':enter', useAnimation(zoomIn, { params: { timing: .5, delay: 0 } }))])
  ]
})
export class ToolbarComponent implements OnInit {

  @ViewChild('content', { read: ViewContainerRef })
  content: ViewContainerRef;

  constructor(
    public locale: LocalizationService,
    private gridService: GridService,
    private dialog: MatDialog,
    private plugins: PluginsService,
    private compiler: Compiler,
    public toolbarService: ToolbarService
  ) { }

  showToolbar = true;
  tabs: Array<Tab>;
  checkInButton: CheckInButton = new CheckInButton(this.toolbarService);

  activeTab: Tab;

  tabClicked(tab) {
    this.toolbarService.activeTab.active = false;
    tab.active = true;
    this.toolbarService.activeTab = tab;
  }

  toolbarToggled() {

  }

  ngOnInit() {
    this.content.clear();

    this.plugins.toolbarButtons.forEach(button => {
      this.content.createComponent(button);
    });
    this.initButtons();
    this.initTabs();
    this.gridService.onSelectionChanged.subscribe(items => {
      this.updateEnables(items);
    });

    // this.toolbarService.buttonClicked.subscribe(s => {
    //   console.log(s);
    // });

  }

  toolbarButtonClicked(button: ToolbarButton) {
    button.onClick(this.gridService.getSelectedRows());
  }

  initTabs() {
    const homeTab = new Tab();
    this.toolbarService.clearTabs();
    homeTab.name = this.locale.resourceStrings['HOME'];
    homeTab.active = true;
    homeTab.items = [ this.checkInButton ];

    const searchTab = new Tab();
    searchTab.name = this.locale.resourceStrings['SEARCH'];
    searchTab.items = [ ];

    const documentTab = new Tab();
    documentTab.name = this.locale.resourceStrings['DOCUMENT'];
    documentTab.items = [ ];

    const workFlowTab = new Tab();
    workFlowTab.name = this.locale.resourceStrings['WORKFLOW'];
    workFlowTab.items = [ ];

    this.toolbarService.addTab(homeTab);
    this.toolbarService.addTab(searchTab);
    this.toolbarService.addTab(documentTab);
    this.toolbarService.addTab(workFlowTab);

    // this.tabs = [ homeTab, searchTab, documentTab, workFlowTab ];
    // this.toolbarService.tabs = this.tabs;
    this.toolbarService.activeTab = homeTab;
  }

  initButtons() {
    // check in
    this.checkInButton.text = this.locale.resourceStrings['TOOLBAR_CHECK_IN'];
    this.checkInButton.popupText = this.locale.resourceStrings['CHECK_IN_SELECTED_DOCUMENT'];
    this.checkInButton.dialog = this.dialog;
    this.checkInButton.enabled = false;
  }

  // update if the button should be enabled or disabled
  updateEnables(selectionItems: Array<SelectionItem>) {
    // do something for enables
  }

}

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe({
  name: 'hidepipe',
})
export class HidePipe {

  transform(objects: any[]): any[] {
      if (objects) {
          return objects.filter(object => {
              return object.hide === false;
          });
      }
  }

}
