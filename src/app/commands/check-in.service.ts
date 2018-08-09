import { Injectable } from '@angular/core';
import { CommandService } from './classes/commandservice';

@Injectable({
  providedIn: 'root'
})
export class CheckInService implements CommandService {

  constructor() { }

  execute() {
    console.log("executing check-in....");
  }

}
