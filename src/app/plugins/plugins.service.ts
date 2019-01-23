import { Injectable, Compiler, EventEmitter } from '@angular/core';

declare var SystemJS: any;

// Needed for the new modules
import * as AngularCore from '@angular/core';
import * as AngularCommon from '@angular/common';
import * as AngularRouter from '@angular/router';
import * as BrowserAnimations from '@angular/platform-browser/animations';
import * as RXJS from 'rxjs';
import * as RXJSOperators from 'rxjs/operators';
import * as UIApi from 'ui-api';

import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap, concatMap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { PluginsConfig, Plugin, UiApiModule } from 'projects/ui-api/src';

@Injectable({
  providedIn: 'root'
})
export class PluginsService {

  constructor(private compiler: Compiler, private http: HttpClient) { }
  toolbarButtons: Array<any> = [];
  onPluginsLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();
  plugins: Array<any> = [];
  loadPlugins(): Observable<any> {
    return this.loadConfig().pipe(switchMap(config => {
      return from(config.plugins).pipe(concatMap(plugin => {
        return from(this.loadModuleSystemJS(plugin)).pipe(map(mod => {
          const factory = mod.componentFactories.find(f => f.selector === plugin.component);
          this.plugins.push(factory);
        }))
      }));
      
    }));
  }

  loadConfig(): Observable<PluginsConfig> {
    return this.http.get('./assets/plugins.config.json')
    .pipe(map(resp => resp as PluginsConfig));
  }

  loadModuleSystemJS(plugin: Plugin): Promise<any> {
    const url = './assets/plugins/' + plugin.file;
    SystemJS.set('@angular/core', SystemJS.newModule(AngularCore));
    SystemJS.set('@angular/common', SystemJS.newModule(AngularCommon));
    SystemJS.set('@angular/router', SystemJS.newModule(AngularRouter));
    SystemJS.set('rxjs', SystemJS.newModule(RXJS));
    SystemJS.set('rxjs/operators', SystemJS.newModule(RXJSOperators));
    SystemJS.set('@angular/platform-browser/animations', SystemJS.newModule(BrowserAnimations));
    SystemJS.set('ui-api', SystemJS.newModule(UIApi));

    // now, import the new module
    return SystemJS.import(`${url}`).then((module) => {
        return this.compiler.compileModuleAndAllComponentsAsync(module[`${plugin.moduleName}`]).then(compiled => {
            console.log(compiled);
            return compiled;
        });
    });
}

}
