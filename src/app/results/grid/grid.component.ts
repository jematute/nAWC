import { Component,OnInit, ViewChild } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid';
import { GridService } from './grid.service';
import { GetDataParams, SortDirection, ResultType, AdeptDataTable } from '../../classes/getDataParams';
import { ColumnsService } from '../../columns/columns.service';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less']
})
export class GridComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  private gridOptions: GridOptions;
  private api: GridApi;
  private columnApi: ColumnApi;
  private length: number;
  private pageSize: number;
  private pageIndex: number;

  columnDefs = [];
  rowData;
  constructor(private gridService: GridService, private columnService: ColumnsService) {
    this.pageSize = 100;
    this.length = 0;
    
    this.gridOptions = < GridOptions > {};
    this.gridOptions.rowData = [];
    this.columnDefs = [];
    this.gridOptions.rowSelection = 'multiple';
    this.getColumns();

    this.gridService.change.subscribe(res => {
      this.length = 0;
      this.pageIndex = 0;
      this.paginator.firstPage();
      this.getPage(0);
    });
  }

  getPage(pageIndex: number) {
    this.api.setRowData([]);
    this.gridOptions.api.hideOverlay();
    let params = <GetDataParams>{};
    let AdeptDataTable = <AdeptDataTable>{};
    params.AdeptDataTable = AdeptDataTable;
    params.AdeptDataTable.Skip = pageIndex * this.pageSize;
    params.AdeptDataTable.Take = this.pageSize;
    params.AdeptDataTable.RecordCount = length;
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
      this.length = dataTable.RecordCount
    })
  }

  getColumns() {
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
  }

  onReady(event) {
    this.api = this.gridOptions.api;
    //this.api.sizeColumnsToFit();
    this.gridOptions.api.setRowData(this.gridService.data.TableRecords);
  }

  onPageEvent(event) {
    console.log("event", event);
    console.log("current page size", this.pageSize);
    this.pageSize = event.pageSize;
    this.getPage(event.pageIndex);
  }

  ngOnInit() {
    console.log(this.gridService.data);    
  }

}
