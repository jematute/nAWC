import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent {
  constructor (public dialog: MatDialog) {

  }

  openError() {
  }


}
