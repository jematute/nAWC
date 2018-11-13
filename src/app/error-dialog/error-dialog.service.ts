import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { ErrorDialogComponent } from './error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  constructor(private bottomSheet: MatBottomSheet) { }

  showError(title: string, message: string) {
    const dialogRef = this.bottomSheet.open(ErrorDialogComponent, { data: { title: title, message: message } });
  }

}
