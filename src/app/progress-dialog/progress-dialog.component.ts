import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../node_modules/@angular/material';
import { LocalizationService } from '../localization/localization.service';
import { MessageData } from '../classes/messageData';
import { ProgressDialogService } from './progress-dialog.service';

@Component({
  selector: 'app-progress-dialog',
  templateUrl: './progress-dialog.component.html',
  styleUrls: ['./progress-dialog.component.less']
})
export class ProgressDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: MessageData,
    public dialogRef: MatDialogRef<ProgressDialogComponent>,
    private locale: LocalizationService,
    private dialogService: ProgressDialogService) { }

  ngOnInit() {
  }

}
