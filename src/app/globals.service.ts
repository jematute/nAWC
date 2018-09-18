import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  constructor() { }

  webApiUrl = 'http://wkst0835:8686/synergis.webapi';

}
