import { Injectable } from '@angular/core';
import { Tab } from '../classes/tab';
import { ToolbarButton } from '../classes/toolbarbutton';
import { Observable, of } from 'rxjs';
import { takeLast } from 'rxjs/operators';
import { CommandsService } from '../commands/commands.service';
import { EventAction } from '../classes/commandinterface';



@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  constructor(private commandsService: CommandsService) {
    console.log('toolbars service loaded hello');
  }

  tabs = new Array<Tab>();
  activeTab: Tab;

  buttonClicked(button: ToolbarButton, data: any): Observable<any> {
    // we report to the command service a button has been clicked
    this.commandsService
    .beginCommand({ action: EventAction.Continue, command: button.command, data: data, currentItem: null })
    .subscribe(item => {

      if (item.action as EventAction === EventAction.Continue) {
        button.action(data);
      }
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
