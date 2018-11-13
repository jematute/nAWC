import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { CheckInComponent } from './check-in/check-in.component';
import { MAT_DIALOG_DATA } from '@angular/material';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { AgGridModule } from 'ag-grid-angular';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './confirm-dialog/confirm-dialog.service';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';
import {ProgressBarModule} from 'primeng/progressbar';
import { ExtractionService } from 'projects/ui-api/src';

@NgModule({
  imports: [
    // tslint:disable-next-line:max-line-length
    CommonModule, CheckboxModule, FormsModule, DropdownModule, AgGridModule.withComponents([ ]), ConfirmDialogModule, ButtonModule, MessagesModule, ProgressBarModule
  ],
  declarations: [CheckInComponent, ConfirmDialogComponent],
  providers: [ MaterialModule, { provide: MAT_DIALOG_DATA, useValue: {} }, ExtractionService, ConfirmDialogService, ErrorDialogService ],
  entryComponents: [ CheckInComponent ]
})
export class CommandsModule { }
