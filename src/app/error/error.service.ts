import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable()
export class ErrorService {
  isShown = false;

  @Output() change: EventEmitter<any> = new EventEmitter();

  toggle(title: string, content: string) {
    this.isShown = !this.isShown;
    this.change.emit({ shown: this.isShown, title: title, content: content });
  }

  constructor() { }

}
