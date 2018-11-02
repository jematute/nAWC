import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { ClientServicesService } from '../client-services/client-services.service';
import { WorkAreaModel, GridService, WorkareaService } from 'projects/ui-api/src';

@Component({
  selector: 'app-workarea',
  templateUrl: './workarea.component.html',
  styleUrls: ['./workarea.component.less']
})
export class WorkareaComponent implements OnInit {

  constructor(private workAreasService: WorkareaService, private grid: GridService) { }
  workAreas: Array<WorkAreaModel>;
  loading = true;
  ngOnInit() {
    this.workAreasService.getWorkAreas(true).subscribe(workAreas => {
      this.loading = false;
      this.workAreas = workAreas;
    });
  }

  workAreaSelected(workArea: WorkAreaModel) {
    this.workAreasService.setCurrentWorkArea(workArea);
    this.grid.dataService = this.workAreasService;
    this.grid.reloadGrid();
  }

}
