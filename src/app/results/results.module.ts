import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results.component';
import { GridComponent } from './grid/grid.component';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  imports: [
    CommonModule,
    AgGridModule.withComponents([ ]), 
  ],
  exports: [],
  declarations: [ ResultsComponent, GridComponent ],
  providers: [ ]
})
export class ResultsModule { }
