import { Component, OnInit } from '@angular/core';
import { ModalDialogService } from '../modal-dialog.service';

@Component({
  selector: 'lib-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.less']
})
export class ModalDialogComponent implements OnInit {

  constructor(private modalService: ModalDialogService) { }

  ngOnInit() {
  }

}
