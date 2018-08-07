import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent, HidePipe } from './toolbar.component';

const components = [ToolbarComponent];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [...components, HidePipe],
  exports: [...components]
})
export class ToolbarModule { }
