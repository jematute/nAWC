import { Component, OnInit, ViewChild } from '@angular/core';
import { GridOptions, GridApi, ColumnApi, ColumnResizedEvent, Column as agColumn, ColumnMovedEvent, SortChangedEvent } from 'ag-grid';
import { GridService } from './grid.service';
import { GetDataParams, SortDirection, ResultType, AdeptDataTable } from '../../classes/getdataparams';
import { ColumnsService } from '../../columns/columns.service';
import { MatPaginator } from '@angular/material';
import { SubscriptionLike as ISubscription, Subscription } from 'rxjs';
import { Column } from '../../classes/column';
import { FileRecord, FileKeys } from '../../classes/file-record';
import { Sort } from '../../classes/sort';

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
  private getDataSubscription: Subscription = new Subscription();
  
  sortingOrder = ["desc", "asc"];

  columnDefs = [];
  rowData;
  constructor(private gridService: GridService, private columnService: ColumnsService) {
    this.pageSize = this.gridService.pageSize;
    this.length = 0;
    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowData = [];
    this.columnDefs = [];
    this.gridOptions.rowSelection = 'multiple';
    this.gridOptions.rowDeselection = true;
    this.gridOptions.enableColResize = true;
    this.gridOptions.enableServerSideSorting = true;
    this.pageIndex = this.gridService.pageIndex;
    this.pageSize = this.gridService.pageSize;
    this.getColumns();
    const subscription = this.gridService.change.subscribe(res => {
      this.length = this.gridService.length;
      this.pageIndex = 0;
      this.gridService.pageIndex = 0;     
      this.paginator.firstPage();
      
      this.getPage(0);
    });
    this.subscription.add(subscription);
  }

  ngOnInit() {   
    let removeRecordsSubscription = this.gridService.onRemoveRecords.subscribe(keys => {
      this.removeRecords(keys);
    });
    this.subscription.add(removeRecordsSubscription);

    let updateRecordsSubscription = this.gridService.onUpdateRecords.subscribe(keys => {
      this.updateRecords(keys);
    });

    this.subscription.add(updateRecordsSubscription);

    if (!this.gridService.dataService) {
      this.getPage(this.pageIndex);
    }      
  }

  getPage(pageIndex: number) {
    this.getDataSubscription.unsubscribe();
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
    params.Sort = new Sort();
    params.Sort.SortField = this.gridService.sort.colId;
    params.Sort.SortOrder = this.gridService.sort.sort == "asc" ? SortDirection.Ascending : SortDirection.Descending;

    this.getDataSubscription = this.gridService.getData(params).subscribe(data => {
      
      this.gridService.gridApi.setRowData(data.AdeptDataTable.TableRecords);
      
      this.gridService.gridApi.hideOverlay();
      this.gridService.getCount(params).subscribe(data => {
        this.gridOptions.api.setSortModel([ this.gridService.sort ]);
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

    this.subscription.add(this.getDataSubscription);
  }

  getColumns() {

    const subscription = this.columnService.getGridColumns().subscribe(cols => {
      cols.forEach(col => {
        let field = this.columnService.lookUpFieldDef(col);
        this.columnDefs.push(
          {
            headerName: field.displayName,
            field: col.schemaId,
            width: col.width,
          })
      });
      this.gridOptions.api.setColumnDefs(this.columnDefs);
    });
    this.subscription.add(subscription);
  }

  onSelectionChanged(event) {
    this.gridService.selectionChanged(event.api.getSelectedRows());
  }

  setOrder() {
    this.gridOptions.api.setSortModel([ this.gridService.sort ]);
  }


  onReady(event) {
    this.gridService.gridApi = this.gridOptions.api;
    //this.api.sizeColumnsToFit();
    if (this.gridService.data) {
      this.gridOptions.api.setRowData(this.gridService.data.TableRecords);
      
    }
    this.paginator.pageSizeOptions = [20, 50, 75, 100, 150, 200, 250, 500, 1000, 2000, 5000, 10000];
  }

  onPageEvent(event) {
    this.pageSize = event.pageSize;
    this.gridService.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.gridService.pageIndex = event.pageIndex;
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

  onSortChanged(event: SortChangedEvent) {
    const sort = event.api.getSortModel()[0];
    if (JSON.stringify(this.gridService.sort) != JSON.stringify(sort)) {
      this.gridService.sort = event.api.getSortModel()[0];
      this.getPage(this.gridService.pageIndex);
    }     
  }

  updateRecords(data: Map<FileKeys, Map<string,string>>) {
    Array.from(data).forEach(entry => {
      let rowNode = this.gridOptions.api.getRowNode(entry["0"].fileId+entry["0"].majRev+entry["0"].minRev);
      let dataToUpdate = rowNode.data as FileRecord;
      Array.from(entry["1"]).forEach(field => {
        dataToUpdate[field["0"]] = field["1"];
      });
      rowNode.setData(dataToUpdate);
    });
  }

  //example on how to update records externally, of course we woud call the service's updateRecords method.
  updateGridRecords() {
    let recordToUpdate = new Map<FileKeys, Map<string, string>>();

    let records = this.gridService.gridApi.getSelectedRows().map(item => {
      let record = item as FileRecord;
      let key: FileKeys = new FileKeys(record);
      let data = new Map<string, string>();
      data.set("SCHEMA_S_STATUS", "OWNED");
      recordToUpdate.set(key, data);
      return recordToUpdate;
    });

    this.updateRecords(recordToUpdate);
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
