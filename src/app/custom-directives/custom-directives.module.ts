import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickToCloseDirective } from './click-to-close.directive';
import { AutofocusDirective } from './autofocus.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ClickToCloseDirective, AutofocusDirective],
  exports: [ClickToCloseDirective, AutofocusDirective]
})
export class CustomDirectivesModule { }
