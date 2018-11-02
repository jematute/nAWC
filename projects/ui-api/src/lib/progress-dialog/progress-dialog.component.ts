import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LocalizationService } from '../localization/localization.service';
import { MessageData } from '../classes/messagedata';

@Component({
  selector: 'lib-progress-dialog',
  templateUrl: './progress-dialog.component.html',
  styleUrls: ['./progress-dialog.component.less']
})
export class ProgressDialogComponent implements OnInit {

  title = 'GenericTitle';
  caption = 'GenericCaption';
  progress = 20;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MessageData,
    public dialogRef: MatDialogRef<ProgressDialogComponent>,
    public locale: LocalizationService) { }

  ngOnInit() {
    this.title = this.data.title;
    this.caption = this.data.message;
    this.progress = 0;
    this.data.onDataUpdate.subscribe(data => {
      if (data.title) {
        this.title = data.title;
      }
      if (data.caption) {
        this.caption = data.caption;
      }
      if (data.progress) {
        this.progress = data.progress;
      }

    });
  }

}
