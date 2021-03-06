import { Component, OnInit, Inject } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import { MessageData } from 'projects/ui-api/src';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.less']
})
export class ErrorDialogComponent implements OnInit {

  constructor(public bottomSheetRef: MatBottomSheetRef<ErrorDialogComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: MessageData) { }

  ngOnInit() {
  }
  openLink(event: MouseEvent): void {
    console.log(this.data);
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
