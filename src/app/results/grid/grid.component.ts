import { Component, OnInit, ViewChild } from '@angular/core';
import { GridOptions, GridApi, ColumnApi, ColumnResizedEvent, Column as agColumn, ColumnMovedEvent, SortChangedEvent } from 'ag-grid';
import { ColumnsService } from '../../columns/columns.service';
import { MatPaginator } from '@angular/material';
import { SubscriptionLike as ISubscription, Subscription } from 'rxjs';
import { GridService, GetDataParams, AdeptDataTable, ResultType, Sort, SortDirection, Column, FileKeys, FileRecord } from 'projects/ui-api/src';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.less']
})
export class GridComponent implements OnInit, OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public gridOptions: GridOptions;
  private columnApi: ColumnApi;
  public length: number;
  public pageSize: number;
  public pageIndex: number;
  private subscription: Subscription = new Subscription();
  private getDataSubscription: Subscription = new Subscription();

  sortingOrder = ['desc', 'asc'];
  columnBeingResized: agColumn;
  columnDefs = [];
  rowData;
  columnMoving = false;
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
    const removeRecordsSubscription = this.gridService.onRemoveRecords.subscribe(keys => {
      this.removeRecords(keys);
    });
    this.subscription.add(removeRecordsSubscription);

    const updateRecordsSubscription = this.gridService.onUpdateRecords.subscribe(keys => {
      this.updateRecords(keys);
    });

    this.subscription.add(updateRecordsSubscription);


  }

  getPage(pageIndex: number) {
    this.getDataSubscription.unsubscribe();
    if (this.gridService.gridApi) {
      this.gridService.gridApi.setRowData([]);
      if (this.gridOptions.api) {
        this.gridOptions.api.showLoadingOverlay();
      }
    }

    const params = <GetDataParams>{};
    // tslint:disable-next-line:no-shadowed-variable
    const AdeptDataTable = <AdeptDataTable>{};
    params.AdeptDataTable = AdeptDataTable;
    params.AdeptDataTable.Skip = pageIndex * this.pageSize;
    params.AdeptDataTable.Take = this.pageSize;
    params.AdeptDataTable.RecordCount = length;
    params.ResultType = ResultType.Normal;
    params.Sort = new Sort();
    params.Sort.SortField = this.gridService.sort.colId;
    params.Sort.SortOrder = this.gridService.sort.sort === 'asc' ? SortDirection.Ascending : SortDirection.Descending;

    this.getDataSubscription = this.gridService.getData(params).subscribe(data => {

      if (this.gridService.gridApi) {
        this.gridService.gridApi.hideOverlay();
        // tslint:disable-next-line:no-shadowed-variable
        this.gridService.getCount(params).subscribe(data => {
          this.gridOptions.api.setSortModel([this.gridService.sort]);
          this.length = data;
          if (data === 0) {
            this.gridService.gridApi.showNoRowsOverlay();
          }
          const columnIds = [];
          // this.gridOptions.columnApi.getAllColumns().forEach(c => {
          //   columnIds.push(c.getId());
          // });
          // this.gridOptions.columnApi.autoSizeColumns(columnIds);
        });
      }
      this.gridService.gridApi.setRowData(data.AdeptDataTable.TableRecords);
    });

    this.subscription.add(this.getDataSubscription);
  }

  getColumns() {

    const subscription = this.columnService.getGridColumns().subscribe(cols => {
      cols.forEach(col => {
        const field = this.columnService.lookUpFieldDef(col);
        this.columnDefs.push(
          {
            headerName: field.displayName,
            field: col.schemaId,
            width: col.width,
            cellClass: 'grid-cell',
          });
      });
      this.gridOptions.api.setColumnDefs(this.columnDefs);
    });
    this.subscription.add(subscription);
  }

  onSelectionChanged(event) {
    this.gridService.selectionChanged(event.api.getSelectedRows());
  }

  setOrder() {
    this.gridOptions.api.setSortModel([this.gridService.sort]);
  }


  onReady(event) {
    this.gridService.gridApi = this.gridOptions.api;
    // this.api.sizeColumnsToFit();
    if (this.gridService.data) {
      this.gridOptions.api.setRowData(this.gridService.data.TableRecords);

    }
    this.paginator.pageSizeOptions = [20, 50, 75, 100, 150, 200, 250, 500, 1000, 2000, 5000, 10000];

    if (!this.gridService.dataService) {
      this.getPage(this.pageIndex);
    }
  }

  onPageEvent(event) {
    this.pageSize = event.pageSize;
    this.gridService.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.gridService.pageIndex = event.pageIndex;
    this.getPage(event.pageIndex);
  }

  onColumnResized(event: ColumnResizedEvent) {
    if (event.column) {
      this.columnBeingResized = event.column;
    }
    if (event.finished) {
      const column: Column = { schemaId: this.columnBeingResized.getColId(), width: this.columnBeingResized.getActualWidth() };
      this.columnService.resizeColumn(column).subscribe();
    }
  }

  onColumnMoved(event: ColumnMovedEvent) {
    this.columnMoving = true;
  }

  onDragStopped() {
    if (this.columnMoving) {
      this.columnMoving = false;
      // tslint:disable-next-line:no-shadowed-variable
      const columns: Column[] = this.gridOptions.columnApi.getAllDisplayedColumns().map(agColumn => {
        return { schemaId: agColumn.getId(), width: agColumn.getActualWidth() };
      });
      this.columnService.setColumnSetColumns(columns).subscribe();
    }
  }

  onSortChanged(event: SortChangedEvent) {
    const sort = event.api.getSortModel()[0];
    if (JSON.stringify(this.gridService.sort) !== JSON.stringify(sort)) {
      this.gridService.sort = event.api.getSortModel()[0];
      this.getPage(this.gridService.pageIndex);
    }
  }

  updateRecords(data: Map<FileKeys, Map<string, string>>) {
    Array.from(data).forEach(entry => {
      const rowNode = this.gridOptions.api.getRowNode(entry['0'].fileId + entry['0'].majRev + entry['0'].minRev);
      const dataToUpdate = rowNode.data as FileRecord;
      Array.from(entry['1']).forEach(field => {
        dataToUpdate[field['0']] = field['1'];
      });
      rowNode.setData(dataToUpdate);
    });
  }

  // example on how to update records externally, of course we woud call the service's updateRecords method.
  updateGridRecords() {
    const recordToUpdate = new Map<FileKeys, Map<string, string>>();

    const records = this.gridService.gridApi.getSelectedRows().map(item => {
      const record = item as FileRecord;
      const key: FileKeys = new FileKeys(record);
      const data = new Map<string, string>();
      data.set('SCHEMA_S_STATUS', 'OWNED');
      recordToUpdate.set(key, data);
      return recordToUpdate;
    });

    this.updateRecords(recordToUpdate);
  }


  removeRecords(keys: FileKeys[]) {
    const nodeData = keys.map(s => {
      return this.gridService.gridApi.getRowNode(s.fileId + s.majRev + s.minRev).data;
    });
    const res = this.gridService.gridApi.updateRowData({ remove: nodeData });
  }

  getRowNodeId(data) {
    return data.SCHEMA_S_FILEID + data.SCHEMA_S_MAJREV + data.SCHEMA_S_MINREV;
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
