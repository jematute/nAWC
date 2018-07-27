import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkareaComponent } from './workarea.component';
import { WorkareaService } from './workarea.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [WorkareaComponent],
  exports: [ ],
  providers: [ WorkareaService ]
})
export class WorkareaModule { }
