import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { concatMap, tap, takeLast } from 'rxjs/operators';
import { PluginManagerService } from '../plugin-manager/plugin-manager.service';
import { CommandEvent } from '../classes/commandinterface';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {

  constructor(private pluginManager: PluginManagerService) { }

  beginCommand(commandEvent: CommandEvent): Observable<CommandEvent> {
    if (this.pluginManager.commandInterfaces.length > 0) {
      return from(this.pluginManager.commandInterfaces).pipe(concatMap(ci => {
        return ci.beginCommand(commandEvent).pipe(tap(result => {
          console.log('item done');
        }));
      }), takeLast(1));
    } else {
      return of(commandEvent);
    }
  }


  beginAction(commandEvent: CommandEvent): Observable<CommandEvent> {

    if (this.pluginManager.commandInterfaces.length > 0) {
      return from(this.pluginManager.commandInterfaces).pipe(concatMap(ci => {
        return ci.beginAction(commandEvent).pipe(tap(result => {
          console.log('item done');
        }));
      }), takeLast(1));
    } else {
      return of(commandEvent);
    }
  }

  beginItem(commandEvent: CommandEvent): Observable<CommandEvent> {
    if (this.pluginManager.commandInterfaces.length > 0) {
      return from(this.pluginManager.commandInterfaces).pipe(concatMap(ci => {
        return ci.beginItem(commandEvent).pipe(tap(result => {
          console.log('item done');
        }));
      }), takeLast(1));
    } else {
      return of(commandEvent);
    }
  }

  endCommand(commandEvent: CommandEvent): Observable<CommandEvent> {
    if (this.pluginManager.commandInterfaces.length > 0) {
      return from(this.pluginManager.commandInterfaces).pipe(concatMap(ci => {
        return ci.endCommand(commandEvent).pipe(tap(result => {
          console.log('item done');
        }));
      }), takeLast(1));
    } else {
      return of(commandEvent);
    }
  }

  endAction(commandEvent: CommandEvent): Observable<CommandEvent> {
    if (this.pluginManager.commandInterfaces.length > 0) {
      return from(this.pluginManager.commandInterfaces).pipe(concatMap(ci => {
        return ci.endAction(commandEvent).pipe(tap(result => {
          console.log('item done');
        }));
      }), takeLast(1));
    } else {
      return of(commandEvent);
    }
  }

  endItem(commandEvent: CommandEvent): Observable<CommandEvent> {
    if (this.pluginManager.commandInterfaces.length > 0) {
      return from(this.pluginManager.commandInterfaces).pipe(concatMap(ci => {
        return ci.endItem(commandEvent).pipe(tap(result => {
          console.log('item done');
        }));
      }), takeLast(1));
    } else {
      return of(commandEvent);
    }
  }


}
