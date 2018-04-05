import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable()
export class ErrorService {
  isShown = false;
  public title = "";

  @Output() change: EventEmitter<boolean> = new EventEmitter();

  toggle() {
    this.isShown = !this.isShown;
    this.change.emit(this.isShown);
  }

  constructor() { }

}
