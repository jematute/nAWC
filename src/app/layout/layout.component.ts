import { Component } from '@angular/core';
import { ErrorService } from '../error/error.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor (private errorService: ErrorService) {

  }

  openError() {
    this.errorService.toggle("Error","There was an error");
  }


}
