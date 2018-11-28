import { Injectable, EventEmitter } from '@angular/core';
import { Tab } from '../classes/tab';
import { ToolbarButton } from '../classes/toolbarbutton';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  commandStarted = new EventEmitter();
  commandFinished = new EventEmitter();

  constructor() {
    console.log('toolbar service loaded hello');
  }

  tabs = new Array<Tab>();
  activeTab: Tab;

  callbacks = [];
  subscribeToClick(callback) {
    callback.push(callback);
  }

  buttonClicked(buttonName: string): Observable<any> {
    //
    this.callbacks.forEach(cb => {
      //
    });
    return of(true);
  }

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

  clearTabs() {
    this.tabs = [];
  }

}
