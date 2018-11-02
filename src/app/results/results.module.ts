import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { GridComponent } from './grid/grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { LoadingPanelComponent } from './grid/loading-panel/loading-panel.component';
import { RouterModule } from '@angular/router';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { MaterialModule, GridService } from 'projects/ui-api/src';


@NgModule({
  imports: [
    CommonModule, ToolbarModule,
    MaterialModule, RouterModule,
    AgGridModule.withComponents([ ]),
  ],
  exports: [],
  declarations: [ ResultsComponent, GridComponent, LoadingPanelComponent ],
  providers: [ GridService ]
})
export class ResultsModule { }
