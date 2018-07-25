import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickToCloseDirective } from './click-to-close.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ClickToCloseDirective],
  exports: [ClickToCloseDirective]
})
export class CustomDirectivesModule { }
