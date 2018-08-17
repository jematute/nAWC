import { Component, OnInit, ViewChild } from '@angular/core';
import { GridOptions, GridApi, ColumnApi, ColumnResizedEvent, Column as agColumn, ColumnMovedEvent } from 'ag-grid';
import { GridService } from './grid.service';
import { GetDataParams, SortDirection, ResultType, AdeptDataTable } from '../../classes/getdataparams';
import { ColumnsService } from '../../columns/columns.service';
import { MatPaginator } from '@angular/material';
import { SubscriptionLike as ISubscription, Subscription } from 'rxjs';
import { Column } from '../../classes/column';
import { FileRecord, FileKeys } from '../../classes/file-record';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less']
})
export class GridComponent implements OnInit, OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  private gridOptions: GridOptions;
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

    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowData = [];
    this.columnDefs = [];
    this.gridOptions.rowSelection = 'multiple';
    this.gridOptions.rowDeselection = true;
    this.gridOptions.enableColResize = true;
    this.getColumns();

    
  }

  ngOnInit() {
    const subscription = this.gridService.change.subscribe(res => {
      this.length = this.gridService.length;
      this.pageIndex = this.gridService.pageIndex;
      this.pageSize = this.gridService.pageSize;
      this.paginator.firstPage();
      this.paginator.pageSizeOptions = [20, 50, 75, 100, 150, 200, 250, 500, 1000, 2000, 5000, 10000];
      this.getPage(0);
    });
    this.subscription.add(subscription);
    
    let removeRecordsSubscription = this.gridService.onRemoveRecords.subscribe(keys => {
      this.removeRecords(keys);
    });
    this.subscription.add(removeRecordsSubscription);

    let updateRecordsSubscription = this.gridService.onUpdateRecords.subscribe(keys => {
      this.updateRecords(keys);
    });

    this.subscription.add(updateRecordsSubscription);

    this.getPage(1);
  }

  getPage(pageIndex: number) {
    if (this.gridService.gridApi) {
      this.gridService.gridApi.setRowData([]);
      if (this.gridOptions.api)
        this.gridOptions.api.showLoadingOverlay();
    }

    let params = <GetDataParams>{};
    let AdeptDataTable = <AdeptDataTable>{};
    params.AdeptDataTable = AdeptDataTable;
    params.AdeptDataTable.Skip = pageIndex * this.pageSize;
    params.AdeptDataTable.Take = this.pageSize;
    params.AdeptDataTable.RecordCount = length;
    params.ResultType = ResultType.Normal;
    params.Sort = "SCHEMA_S_LONGNAME";
    params.SortDirection = SortDirection.Ascending;
    const subscription = this.gridService.getData(params).subscribe(data => {
      this.gridService.gridApi.setRowData(data.AdeptDataTable.TableRecords);
      this.gridService.gridApi.hideOverlay();
      this.gridService.getCount(params).subscribe(data => {
        this.length = data;
        if (data == 0) {
          this.gridService.gridApi.showNoRowsOverlay();
        }
        let columnIds = [];
        // this.gridOptions.columnApi.getAllColumns().forEach(c => {
        //   columnIds.push(c.getId());
        // });
        //this.gridOptions.columnApi.autoSizeColumns(columnIds);
      });
    });

    this.subscription.add(subscription);
  }

  getColumns() {

    const subscription = this.columnService.getGridColumns().subscribe(cols => {
      cols.forEach(col => {
        let field = this.columnService.lookUpFieldDef(col);
        this.columnDefs.push(
          {
            headerName: field.displayName,
            field: col.schemaId,
            width: col.width
          })
      });
      this.gridOptions.api.setColumnDefs(this.columnDefs);
    });
    this.subscription.add(subscription);
  }

  onSelectionChanged(event) {
    this.gridService.selectionChanged(event.api.getSelectedRows());
  }


  onReady(event) {
    this.gridService.gridApi = this.gridOptions.api;
    //this.api.sizeColumnsToFit();
    this.gridOptions.api.setRowData(this.gridService.data.TableRecords);

  }

  onPageEvent(event) {
    this.pageSize = event.pageSize;
    this.getPage(event.pageIndex);
  }

  columnBeingResized: agColumn;
  onColumnResized(event: ColumnResizedEvent) {
    if (event.column)
      this.columnBeingResized = event.column;
    if (event.finished) {
      const column: Column = { schemaId: this.columnBeingResized.getColId(), width: this.columnBeingResized.getActualWidth() };
      this.columnService.resizeColumn(column).subscribe();
    }      
  }

  columnMoving: boolean = false;
  onColumnMoved(event: ColumnMovedEvent) {
    this.columnMoving = true;  
  }

  onDragStopped() {
    if (this.columnMoving) {
      this.columnMoving = false;
      let columns: Column[] = this.gridOptions.columnApi.getAllDisplayedColumns().map(agColumn => {
        return { schemaId: agColumn.getId(), width: agColumn.getActualWidth() };
      });
      this.columnService.setColumnSetColumns(columns).subscribe();
    }
  }

  updateRecords(keys: FileKeys[]) {

  }


  removeRecords(keys: FileKeys[]) {
    let nodeData = keys.map(s => {
      return this.gridService.gridApi.getRowNode(s.fileId + s.majRev + s.minRev).data;
    });
    var res = this.gridService.gridApi.updateRowData({ remove: nodeData });
  }

  getRowNodeId(data) {
    return data.SCHEMA_S_FILEID+data.SCHEMA_S_MAJREV+data.SCHEMA_S_MINREV;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
