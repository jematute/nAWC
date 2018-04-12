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
  columnDefs = [];
  rowData;
  constructor(private gridService: GridService, private columnService: ColumnsService) {
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
      let params = <GetDataParams>{};
      let AdeptDataTable = <AdeptDataTable>{};
      params.AdeptDataTable = AdeptDataTable;
      params.AdeptDataTable.Skip = 0;
      params.AdeptDataTable.Take = 1000;
      params.AdeptDataTable.RecordCount = 0;
      params.ResultType = ResultType.Normal;
      params.Sort = "SCHEMA_S_LOGNNAME";
      params.SortDirection = SortDirection.Ascending;
      this.gridService.getData(params).subscribe(data => {
        let dataTable = data as AdeptDataTable;
        console.log(dataTable);
        this.gridOptions.api.setRowData(dataTable.TableRecords);
      })
    });
  }

  onReady(event) {
    this.api = this.gridOptions.api;
    //this.api.sizeColumnsToFit();
  }

  ngOnInit() {

  }

}
