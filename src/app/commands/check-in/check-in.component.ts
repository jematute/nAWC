import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '../../../../node_modules/@angular/material';
import { LocalizationService } from '../../localization/localization.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.less']
})
export class CheckInComponent implements OnInit {

  bReadyForOk: boolean = false;
  processing: boolean = false;

  constructor(public dialogRef: MatDialogRef<CheckInComponent>, private locale: LocalizationService) { }

  ngOnInit() {
  }

  onCheckInDialogOK() {
    console.log("OK");
  }

  onCheckInDialogCancel() {
    this.dialogRef.close();
  }

}
