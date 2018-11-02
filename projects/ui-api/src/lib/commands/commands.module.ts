import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckInService } from './check-in/check-in.service';
import { CheckInComponent } from './check-in/check-in.component';
import { MAT_DIALOG_DATA } from '@angular/material';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { AgGridModule } from 'ag-grid-angular';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import {ProgressBarModule} from 'primeng/progressbar';
import { MaterialModule } from '../material/material.module';
import { ConfirmDialogComponent } from './check-in/confirm-dialog/confirm-dialog.component';
import { ExtractionService } from '../extraction/extraction.service';
import { ConfirmDialogService } from './check-in/confirm-dialog/confirm-dialog.service';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';

@NgModule({
  imports: [
    // tslint:disable-next-line:max-line-length
    CommonModule, CheckboxModule, FormsModule, DropdownModule, AgGridModule.withComponents([ ]), ConfirmDialogModule, ButtonModule, MessagesModule, ProgressBarModule
  ],
  declarations: [CheckInComponent, ConfirmDialogComponent],
  // tslint:disable-next-line:max-line-length
  providers: [ CheckInService, MaterialModule, { provide: MAT_DIALOG_DATA, useValue: {} }, ExtractionService, ConfirmDialogService, ErrorDialogService ],
  entryComponents: [ CheckInComponent ]
})
export class CommandsModule { }
