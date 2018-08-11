import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material';
import { LocalizationService } from '../../localization/localization.service';
import { SelectionItem } from '../../classes/selectionitem';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.less']
})
export class CheckInComponent implements OnInit {

  bReadyForOk: boolean = false;
  processing: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CheckInComponent>, 
    private locale: LocalizationService, 
    @Inject(MAT_DIALOG_DATA) public selectionItems: SelectionItem[]) { }

  ngOnInit() {
    console.log("selection items:", this.selectionItems)
  }

  onCheckInDialogOK() {
    console.log("OK");
  }

  onCheckInDialogCancel() {
    this.dialogRef.close();
  }

}
