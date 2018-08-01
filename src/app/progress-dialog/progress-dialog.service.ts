import { Injectable } from '@angular/core';
import { MatDialog } from '../../../node_modules/@angular/material';
import { ProgressDialogComponent } from './progress-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ProgressDialogService {

  constructor(public dialog: MatDialog) { }

  progress = 0;
  title = "Progress";
  caption = "";
  
  open() {
    this.progress = 30;
    this.dialog.open(ProgressDialogComponent, { width: "300px" });
  }

  increaseProgress(value: number) {
    this.progress = this.progress + value;
  }


}
