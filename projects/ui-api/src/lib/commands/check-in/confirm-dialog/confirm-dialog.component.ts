import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from './confirm-dialog.service';
import { LocalizationService } from '../../../localization/localization.service';

@Component({
  selector: 'lib-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.less']
})
export class ConfirmDialogComponent implements OnInit {

  shown = false;
  title = '';
  messages: string[] = [];
  constructor(private service: ConfirmDialogService, public locale: LocalizationService) { }

  ngOnInit() {
    this.service.onOpen.subscribe(res => {
      this.title = res.title;
      this.messages = res.messages;
      this.shown = true;
    });
    this.service.onClose.subscribe(() => this.shown = false);
  }

  answer(answer) {
    this.service.onClose.emit(answer);
  }

}
