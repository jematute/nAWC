import { Component,OnInit, ViewChild } from '@angular/core';
import { GridOptions, GridApi, ColumnApi } from 'ag-grid';
import { GridService } from './grid.service';
import { GetDataParams, SortDirection, ResultType, AdeptDataTable } from '../../classes/getDataParams';
import { ColumnsService } from '../../columns/columns.service';
import { MatPaginator } from '@angular/material';
import { SubscriptionLike as ISubscription, Subscription } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less']
})
export class GridComponent implements OnInit, OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  private gridOptions: GridOptions;
  private api: GridApi;
  private columnApi: ColumnApi;
  private length: number;
  private pageSize: number;
  private pageIndex: number;
  private subscription: Subscription = new Subscription();
  
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

    const subscription = this.gridService.change.subscribe(res => {
      this.length = gridService.length;
      this.pageIndex = gridService.pageIndex;
      this.pageSize = gridService.pageSize;
      this.paginator.firstPage();
      this.paginator.pageSizeOptions = [20,50,75,100,150,200,250,500,1000,2000,5000,10000];
      this.getPage(0);
    });
    this.subscription.add(subscription);
  }

  getPage(pageIndex: number) {
    if (this.api) {
      this.api.setRowData([]);
      this.api.hideOverlay();
    } 
    
    let params = <GetDataParams>{};
    let AdeptDataTable = <AdeptDataTable>{};
    params.AdeptDataTable = AdeptDataTable;
    params.AdeptDataTable.Skip = pageIndex * this.pageSize;
    params.AdeptDataTable.Take = this.pageSize;
    params.AdeptDataTable.RecordCount = length;
    params.ResultType = ResultType.Normal;
    params.Sort = "SCHEMA_S_LOGNNAME";
    params.SortDirection = SortDirection.Ascending;
    const subscription = this.gridService.getData(params).subscribe(data => {
      let dataTable = data as AdeptDataTable;
      this.api.setRowData(dataTable.TableRecords);
      this.gridService.getCount(params).subscribe(data => {
        this.length = data;
      });
    })
    
    this.subscription.add(subscription);
  }

  getColumns() {

    const subscription = this.columnService.getGridColumns().subscribe(cols => {
      cols.forEach(col => this.columnDefs.push(
          { 
            headerName: col.displayName, 
            field: col.schemaID, 
            width: col.width*5
          })
        );
        this.gridOptions.api.setColumnDefs(this.columnDefs);
    });
    this.subscription.add(subscription);
  }

  onReady(event) {
    this.api = this.gridOptions.api;
    //this.api.sizeColumnsToFit();
    this.gridOptions.api.setRowData(this.gridService.data.TableRecords);
  }

  onPageEvent(event) {
    this.pageSize = event.pageSize;
    this.getPage(event.pageIndex);
  }

  ngOnInit() {
    //console.log(this.gridService.data);    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
