import { Component, OnInit, Pipe } from '@angular/core';
import { LocalizationService } from '../localization/localization.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less']
})
export class ToolbarComponent implements OnInit {

  constructor(private locale: LocalizationService) { }

  showToolbar: boolean = true;
  

  tabs = [
    { name: this.locale.resourceStrings["HOME"], active: true, items: [] },
    { name: this.locale.resourceStrings["SEARCH"], active: false, items: [] },
    { name: this.locale.resourceStrings["DOCUMENT"], active: false, items: [] },
    { name: this.locale.resourceStrings["WORKFLOW"], active: false, items: [] }
  ];

  activeTab: Object = this.tabs[0];

  tabCLicked() {

  }

  toolbarToggled() {

  }

  ngOnInit() {
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
