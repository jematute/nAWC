import { Injectable, EventEmitter } from '@angular/core';
import { Tab } from '../classes/tab';
import { ToolbarButton } from './buttons/toolbarbutton';


@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  onButtonClicked = new EventEmitter();

  constructor() {
    console.log('toolbar service loaded hello');
  }

  tabs = new Array<Tab>();
  activeTab: Tab;

  addButton(button: ToolbarButton, tabName: string) {
    const tab = this.tabs.find(t => t.name.toLowerCase() === tabName.toLowerCase());
    tab.items.push(button);
  }

  removeButton(id: number, tabName: string) {
    const tab = this.tabs.find(t => t.name === tabName);
    tab.items = tab.items.filter(button => button.id === id);
  }

  addTab(tab: Tab) {
    this.tabs.push(tab);
  }

  removeTab(name: string) {
    this.tabs = this.tabs.filter(tab => tab.name === name);
  }

}
