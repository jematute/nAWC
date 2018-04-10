import { Component, OnInit, Inject } from '@angular/core';
import { ErrorService } from './error.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less']
})
export class ErrorComponent {

  public isShown: boolean;
  public title: string;
  public content: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() { 
    // this.errorService.change.subscribe(obj => {
      
    // });
  }
}