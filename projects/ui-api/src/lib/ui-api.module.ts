import { NgModule } from '@angular/core';
import { UiApiComponent } from './ui-api.component';
import { ToolbarService } from './toolbar/toolbar.service';
import { CommandsService } from './commands/commands.service';
import { PluginManagerService } from './plugin-manager/plugin-manager.service';

@NgModule({
  imports: [
  ],
  declarations: [UiApiComponent],
  exports: [UiApiComponent],
  providers: [ ToolbarService, CommandsService, PluginManagerService ]
})
export class UiApiModule { }
