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

}
