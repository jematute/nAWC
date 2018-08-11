import { Injectable } from '@angular/core';
import { CommandService } from '../classes/commandservice';
import { MatDialog } from '../../../../node_modules/@angular/material';
import { CheckInComponent } from './check-in.component';
import { SelectionItem } from '../../classes/selectionitem';

@Injectable({
  providedIn: 'root'
})
export class CheckInService implements CommandService {

  constructor(public dialog: MatDialog) { }

  open(selectionItems: SelectionItem[]) {
    
    this.dialog.open(CheckInComponent, { data: selectionItems, panelClass: "command-dialog" });
    console.log("executing check-in....");
  }

}
