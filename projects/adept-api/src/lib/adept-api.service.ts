import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdeptApiService {

  constructor() { }

  onMessage = new EventEmitter<string>();

  sendMessage() {
    this.onMessage.emit('Hello from the service');
  }

}
