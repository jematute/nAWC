import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-menu',
  templateUrl: './help-menu.component.html',
  styleUrls: ['./help-menu.component.less']
})
export class HelpMenuComponent implements OnInit {

  constructor() { }

  showHelpOptions: boolean = false;

  toggleHelp() {
    this.showHelpOptions = !this.showHelpOptions;
  }

  closeHelpMenu() {
    this.showHelpOptions = false;
  }

  ngOnInit() {
  }

  //Bill 09-17-2018 Implimented help display
  //     Note assets path like assets/Help/index.html is Case Sensative
  gotoHelp(helpFileFormat: string) {
    this.showHelpOptions = false;
    switch (helpFileFormat) {
      case "html":
        window.open(window.location.origin + "/assets/help/index.html"); 
        break;
      case "pdf":
        window.open(window.location.origin + "/assets/help/AdeptAWCUser.pdf"); 
        break;
    }

  }
}
