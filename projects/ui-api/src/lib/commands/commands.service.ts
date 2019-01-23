import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { PluginManagerService } from '../plugin-manager/plugin-manager.service';
import { CommandEvent } from '../classes/commandinterface';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  constructor(private pluginManager: PluginManagerService) { }

  beginAction(commandEvent: CommandEvent): Observable<any> {
    return from(this.pluginManager.commandInterfaces).pipe(concatMap(ci => {
      return ci.beginAction(commandEvent);
    }));
  }


}
