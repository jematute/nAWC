import { Component } from '@angular/core';
import { ErrorService } from '../error/error.service';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from '../error/error.component';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor (private errorService: ErrorService, public dialog: MatDialog) {

  }

  openError() {
    let dialogRef = this.dialog.open(ErrorComponent, {
      width: '250px',
      data: { name: "hi", animal: "Zebra" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
    });
  }


}
