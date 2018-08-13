import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInService } from './check-in/check-in.service';
import { MaterialModule } from '../material/material.module';
import { CheckInComponent } from './check-in/check-in.component';
import { MAT_DIALOG_DATA } from '@angular/material';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule, CheckboxModule, FormsModule, DropdownModule, AgGridModule.withComponents([ ])
  ],
  declarations: [CheckInComponent],
  providers: [ CheckInService, MaterialModule, { provide: MAT_DIALOG_DATA, useValue: {} }],
  entryComponents: [ CheckInComponent ]
})
export class CommandsModule { }
