import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';
import { ErrorService } from './error.service';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule, MaterialModule
  ],
  exports: [ ErrorComponent ],
  declarations: [ ErrorComponent ],
  providers: [ ErrorService ],
  entryComponents: [ ErrorComponent ]
})
export class ErrorModule { }
