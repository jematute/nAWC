import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProgressDialogComponent } from './progress-dialog.component';
import { MessageData } from '../classes/messagedata';

@Injectable({
  providedIn: 'root'
})
export class ProgressDialogService {

  constructor(public dialog: MatDialog) { }

  data: MessageData;
  progress = 0;

  open(title: string, caption: string) {
    this.data = new MessageData();
    this.data.title = title;
    this.data.message = caption;
    this.dialog.open(ProgressDialogComponent, { width: "300px", data: this.data });
  }

  close() {
    this.dialog.closeAll();
  }

  increaseProgress(value: number) {
    this.data.onDataUpdate.emit({ progress: this.progress + value });
  }

  updateTitle(title: string) {
    this.data.onDataUpdate.emit({ title: title });
  }

  updateCaption(caption: string) {
    this.data.onDataUpdate.emit({ caption: caption });
  }

}
