import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { GridComponent } from './grid/grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { GridService } from './grid/grid.service';
import { LoadingPanelComponent } from './grid/loading-panel/loading-panel.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AgGridModule.withComponents([ ]), 
  ],
  exports: [],
  declarations: [ ResultsComponent, GridComponent, LoadingPanelComponent ],
  providers: [ GridService ]
})
export class ResultsModule { }
