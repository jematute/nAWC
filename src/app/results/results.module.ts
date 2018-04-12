import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { GridComponent } from './grid/grid.component';
import { AgGridModule } from 'ag-grid-angular';
import { GridService } from './grid/grid.service';


@NgModule({
  imports: [
    CommonModule,
    AgGridModule.withComponents([ ]), 
  ],
  exports: [],
  declarations: [ ResultsComponent, GridComponent ],
  providers: [ GridService ]
})
export class ResultsModule { }
