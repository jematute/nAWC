import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { fadeAnimation } from './fade.animations';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
  animations: [fadeAnimation]
})
export class LayoutComponent {
  constructor (public dialog: MatDialog) {

  }

  openError() {
  }

  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }


}
