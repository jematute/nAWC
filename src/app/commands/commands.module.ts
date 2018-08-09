import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInService } from './check-in/check-in.service';
import { MaterialModule } from '../material/material.module';
import { CheckInComponent } from './check-in/check-in.component';
import { MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CheckInComponent],
  providers: [ CheckInService, MaterialModule, { provide: MAT_DIALOG_DATA, useValue: {} }],
  entryComponents: [ CheckInComponent ]
})
export class CommandsModule { }
