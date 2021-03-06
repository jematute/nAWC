import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { LocalizationService } from 'projects/ui-api/src';

@Component({
  selector: 'app-login-prompt',
  templateUrl: './login-prompt.component.html',
  styleUrls: ['./login-prompt.component.less']
})
export class LoginPromptComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginPromptComponent>, public locale: LocalizationService) { }

  ngOnInit() {
  }

  continue() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close();
  }

}
