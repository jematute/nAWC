import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent, HidePipe } from './toolbar.component';
import { CommandsModule } from 'projects/ui-api/src';

const components = [ToolbarComponent];

@NgModule({
  imports: [
    CommonModule, CommandsModule
  ],
  declarations: [...components, HidePipe ],
  exports: [...components]
})
export class ToolbarModule { }
