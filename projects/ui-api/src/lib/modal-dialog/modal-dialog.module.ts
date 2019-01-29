import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule, MaterialModule
  ],
  declarations: [ModalDialogComponent]
})
export class ModalDialogModule { }
