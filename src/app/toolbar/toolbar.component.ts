import { Component, OnInit, Pipe } from '@angular/core';
import { LocalizationService } from '../localization/localization.service';
import { CheckInButton } from './buttons/check-in-button';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent implements OnInit {

  constructor(private locale: LocalizationService) { }

  showToolbar: boolean = true;
  tabs: Array<Object>;

  activeTab: Object;

  checkInButton = new CheckInButton();

  tabClicked(tab) {
    this.activeTab["active"] = false;
    tab.active = true;
    this.activeTab = tab;
  }

  toolbarToggled() {

  }

  ngOnInit() {
    this.tabs = [
      { name: this.locale.resourceStrings["HOME"], active: true, items: [
        this.checkInButton,
      ] },
      { name: this.locale.resourceStrings["SEARCH"], active: false, items: [] },
      { name: this.locale.resourceStrings["DOCUMENT"], active: false, items: [] },
      { name: this.locale.resourceStrings["WORKFLOW"], active: false, items: [] }
    ];
    this.initButtons();
    this.activeTab = this.tabs[0];
  }

  initButtons() {
    //check in
    this.checkInButton.text = this.locale.resourceStrings["TOOLBAR_CHECK_IN"];
    this.checkInButton.popupText = this.locale.resourceStrings["CHECK_IN_SELECTED_DOCUMENT"];
    
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
