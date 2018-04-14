import { Component,OnInit } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid';
import { GridService } from './grid.service';
import { GetDataParams, SortDirection, ResultType, AdeptDataTable } from '../../classes/getDataParams';
import { ColumnsService } from '../../columns/columns.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less']
})
export class GridComponent implements OnInit {

  private gridOptions: GridOptions;
  private api: GridApi;
  private columnApi: ColumnApi;
  private numberOfPages: number;
  private pageSize: number;
  private pageIndex: number;

  columnDefs = [];
  rowData;
  constructor(private gridService: GridService, private columnService: ColumnsService) {
    this.pageSize = 100;
    this.numberOfPages = 0;

    this.gridOptions = < GridOptions > {};
    this.gridOptions.rowData = [];
    this.columnDefs = [];
    this.columnService.getGridColumns().subscribe(cols => {
      cols.forEach(col => this.columnDefs.push(
          { 
            headerName: col.displayName, 
            field: col.schemaID, 
            width: col.width*5
          })
        );
        this.gridOptions.api.setColumnDefs(this.columnDefs);
    });

    this.gridService.change.subscribe(res => {
      this.getPage(0);
    });
  }

  getPage(pageIndex: number, itemsPerPage?: number) {
    let params = <GetDataParams>{};
    let AdeptDataTable = <AdeptDataTable>{};
    params.AdeptDataTable = AdeptDataTable;
    params.AdeptDataTable.Skip = pageIndex * this.pageSize;
    params.AdeptDataTable.Take = this.pageSize;
    params.AdeptDataTable.RecordCount = 0;
    params.ResultType = ResultType.Normal;
    params.Sort = "SCHEMA_S_LOGNNAME";
    params.SortDirection = SortDirection.Ascending;
    this.gridService.getData(params).subscribe(data => {
      let dataTable = data as AdeptDataTable;
      console.log(dataTable);
      this.gridOptions.api.setRowData(dataTable.TableRecords);
    })
    this.gridService.getCount(params).subscribe(data => {
      let dataTable = data as AdeptDataTable;
      this.numberOfPages = Math.ceil(dataTable.RecordCount/this.pageSize);
    })

  }

  onReady(event) {
    this.api = this.gridOptions.api;
    //this.api.sizeColumnsToFit();
  }

  onPageEvent(event) {
    console.log(event);
  }

  ngOnInit() {

  }

}
