import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginsService } from './plugins.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ PluginsService ]
})
export class PluginsModule { }
