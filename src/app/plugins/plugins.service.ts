import { Injectable, Compiler, EventEmitter } from '@angular/core';

declare var SystemJS: any;

// Needed for the new modules
import * as AngularCore from '@angular/core';
import * as AngularCommon from '@angular/common';
import * as AngularRouter from '@angular/router';
import * as BrowserAnimations from '@angular/platform-browser/animations';
import * as AdeptAPI from 'adept-api';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Plugin, PluginsConfig } from '../classes/plugins-config';

@Injectable({
  providedIn: 'root'
})
export class PluginsService {

  constructor(private compiler: Compiler, private http: HttpClient) { }
  toolbarButtons: Array<any> = [];
  onPluginsLoaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  loadPlugins() {
    this.loadConfig().subscribe(config => {
      config.plugins.forEach(plugin => {
        this.loadModuleSystemJS(plugin).then(mod => {
          const factory = mod.componentFactories.find(f => f.selector === plugin.component);
          switch (plugin.type) {
            case "toolbar":
              this.toolbarButtons.push(factory);
            default:
              console.log(factory);
          }
        });
      });
    }, error => {}, () => {
      console.log("done");
    })
  }

  loadConfig(): Observable<PluginsConfig> {
    return this.http.get("./assets/plugins.config.json")
    .pipe(map(resp => resp as PluginsConfig));
  }

  loadModuleSystemJS(plugin: Plugin): Promise<any> {
    let url = './assets/plugins/' + plugin.file;
    SystemJS.set('@angular/core', SystemJS.newModule(AngularCore));
    SystemJS.set('@angular/common', SystemJS.newModule(AngularCommon));
    SystemJS.set('@angular/router', SystemJS.newModule(AngularRouter));
    SystemJS.set('@angular/platform-browser/animations', SystemJS.newModule(BrowserAnimations));
    SystemJS.set('adept-api', SystemJS.newModule(AdeptAPI));

    // now, import the new module
    return SystemJS.import(`${url}`).then((module) => {
        return this.compiler.compileModuleAndAllComponentsAsync(module[`${plugin.moduleName}`]).then(compiled => {
            console.log(compiled);
            return compiled;
        });
    });
}

}
