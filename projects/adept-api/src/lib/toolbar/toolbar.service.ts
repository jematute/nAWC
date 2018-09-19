import { Injectable } from '@angular/core';
import { Tab } from '../classes/tab';
import { ToolbarButton } from '../classes/toolbarbutton';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  constructor() { }

  tabs = new Array<Tab>();

  addButton(button: ToolbarButton, tabName: string) {
    const tab = this.tabs.find(t => t.name === tabName);
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
