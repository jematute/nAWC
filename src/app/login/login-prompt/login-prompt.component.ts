import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '../../../../node_modules/@angular/material';
import { LocalizationService } from '../../localization/localization.service';
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
