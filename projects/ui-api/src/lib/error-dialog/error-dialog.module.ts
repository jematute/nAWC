import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './error-dialog.component';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { ErrorDialogService } from './error-dialog.service';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule, MaterialModule
  ],
  declarations: [ ErrorDialogComponent ],
  entryComponents: [ ErrorDialogComponent ],
  providers: [ { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }, ErrorDialogService ]
})
export class ErrorDialogModule {
}
