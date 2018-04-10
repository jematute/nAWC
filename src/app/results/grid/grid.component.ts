import { Component, OnInit } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less']
})
export class GridComponent implements OnInit {

  private gridOptions: GridOptions;
  private api: GridApi;
  private columnApi: ColumnApi;
  columnDefs;
  rowData;
  constructor() {
    this.gridOptions = <GridOptions>{};
    
    this.columnDefs = [
      {headerName: "Make", field: "make", width: 300},
      {headerName: "Model", field: "model", width: 300},
      {headerName: "Price", field: "price", width: 300}
  ];

    this.rowData = [
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
    ]

  }

  onReady(event) {
    console.log("Grid Ready!!!!");
    this.gridOptions.api.sizeColumnsToFit();
  }

  ngOnInit() {

  }

}
