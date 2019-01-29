import { Injectable } from '@angular/core';
import { ICommands } from '../classes/commandinterface';
@Injectable({
  providedIn: 'root'
})
export class PluginManagerService {

  constructor() { }

  commandInterfaces: Array<ICommands> = [];

  registerCommandInterface(commandInterface: ICommands) {
    if (!this.commandInterfaces.find(ci => ci.interfaceId === commandInterface.interfaceId)) {
      this.commandInterfaces.push(commandInterface);
    }
  }

  unregisterCommandInterface(commandInterface: ICommands) {
    this.commandInterfaces.forEach((item, index) => {
      if (item.interfaceId === commandInterface.interfaceId) {
        this.commandInterfaces.splice(index, 1);
      }
    });
  }


}
