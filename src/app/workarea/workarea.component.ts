import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { ClientServicesService } from '../client-services/client-services.service';
import { WorkareaService } from './workarea.service';
import { WorkAreaModel } from './classes/WorkAreadModel';

@Component({
  selector: 'workarea',
  templateUrl: "./workarea.component.html",
  styleUrls: ['./workarea.component.less']
})
export class WorkareaComponent implements OnInit {

  constructor(private workAreasService: WorkareaService) { }
  workAreas: Array<WorkAreaModel>;
  loading: boolean = true;
  ngOnInit() {
    this.workAreasService.getWorkAreas(true).subscribe(workAreas => {
      this.loading = false;
      this.workAreas = workAreas;
    });
  }

  workAreaSelected(workArea: WorkAreaModel) {
    this.workAreasService.getWorkAreaItems(workArea).subscribe();
  }

}
