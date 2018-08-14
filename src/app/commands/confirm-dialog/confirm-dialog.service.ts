import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  
  onOpen: EventEmitter<any> = new EventEmitter<any>();
  onClose: EventEmitter<any> = new EventEmitter<any>();
  
  Open(title: string, messages: string[]): Observable<any> {
    this.onOpen.emit({ title: title, messages: messages });
    return this.onClose;
  }

  Close() {
    this.onClose.emit();
  }

  constructor() { }
}
