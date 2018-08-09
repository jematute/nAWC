import { Injectable } from '@angular/core';
import { CommandService } from '../classes/commandservice';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { CheckInComponent } from './check-in.component';

@Injectable({
  providedIn: 'root'
})
export class CheckInService implements CommandService {

  constructor(public dialog: MatDialog) { }

  execute() {
    console.log("executing check-in....");
    this.dialog.open(CheckInComponent);
  }

}
