import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { ClientServicesService } from '../client-services/client-services.service';

@Component({
  selector: 'workarea',
  templateUrl: "./workarea.component.html",
  styleUrls: ['./workarea.component.less']
})
export class WorkareaComponent implements OnInit {

  constructor(private clientServices: ClientServicesService) { }

  ngOnInit() {
  }

  loginACS() {
    this.clientServices.loginToACS().subscribe();
  }
}
