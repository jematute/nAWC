import { Injectable, EventEmitter } from '@angular/core';
import { Tab } from '../classes/tab';
import { ToolbarButton } from '../classes/toolbarbutton';
import { Observable, of, forkJoin, Subject, concat } from 'rxjs';
import { tap } from 'rxjs/operators';


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

  private callbacks = new Array<Observable<any>>();

  registerStartCallback() {
    const obs = new Subject<any>();
    this.callbacks.push(obs);
    return obs;
  }

  buttonClicked(buttonName: string): Observable<any> {
    //this.commandStarted.emit();
    if (this.callbacks.length > 0) {
      return concat(this.callbacks).pipe(tap(() => {
        console.log('all emits have occurred');
        this.callbacks = [];
      }));
    } else {
      return of(true);
    }
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
