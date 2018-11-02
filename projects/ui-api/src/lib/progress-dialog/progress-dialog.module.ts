import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ProgressDialogService } from './progress-dialog.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ProgressDialogComponent } from './progress-dialog.component';


@NgModule({
  imports: [
    CommonModule, MaterialModule
  ],
  declarations: [ProgressDialogComponent],
  providers: [ProgressDialogService, { provide: MAT_DIALOG_DATA, useValue: {} }],
  entryComponents: [ ProgressDialogComponent ]
})
export class ProgressDialogModule { }
