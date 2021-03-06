import { Injectable, EventEmitter, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { GridApi } from 'ag-grid-community';
import { Router } from '@angular/router';
import { AdeptDataTable, GetDataParams } from '../classes/getdataparams';
import { Column } from '../classes/column';
import { IGridInterface } from '../classes/grid-interface';
import { SelectionItem, DetailedInfo, CommandParams } from '../classes/selectionitem';
import { UIEnable } from '../classes/uirightsandenables';
import { FileKeys, FileRecord } from '../classes/file-record';
import { SearchParams } from '../classes/search-params';
import { ApiTypes } from '../classes/apitypes';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  public gridApi: GridApi;
  public data: AdeptDataTable = { TableRecords: [], Skip: 0, Take: 0, RecordCount: 0 };
  public length = 0;
  public _pageSize: number;
  public _pageIndex: number;
  public columns: Array<Column>;
  private _sort: any;
  public dataService: IGridInterface;
  public change: EventEmitter<any> = new EventEmitter();
  public loading: EventEmitter<boolean> = new EventEmitter();
  public onSelectionChanged: EventEmitter<Array<SelectionItem>> = new EventEmitter();
  public menuEnables: Map<string, UIEnable>;
  public onRemoveRecords: EventEmitter<FileKeys[]> = new EventEmitter<FileKeys[]>();
  public onUpdateRecords: EventEmitter<FileKeys[]> = new EventEmitter<FileKeys[]>();

  constructor(private router: Router, private injector: Injector) {
    this.data = new AdeptDataTable();
  }

  getData(params: GetDataParams): Observable<SearchParams> {
    if (!this.dataService) {
      const serviceName = localStorage.getItem('DataService');
      if (serviceName) {
        this.dataService = this.injector.get(serviceName);
        params = JSON.parse(localStorage.getItem('DataServiceParams')) as GetDataParams;
      } else {
        return of(new SearchParams());
      }
    } else {
      localStorage.setItem('DataService', this.dataService.getName());
      localStorage.setItem('DataServiceParams', JSON.stringify(params));
    }

    // this.loading.emit(true);
    return this.dataService.getData(params)
      .pipe(tap(result => {
        this.data = result.AdeptDataTable;
        this.menuEnables = result.MenuEnables;
      }), finalize(() => {
        // this.loading.emit(false);
      }));
  }

  getCount(params: GetDataParams): Observable<number> {
    if (params) {
      localStorage.setItem('DataServiceCountParams', JSON.stringify(params));
    } else {
      params = JSON.parse(localStorage.getItem('DataServiceCountParams')) as GetDataParams;
    }

    if (this.dataService) {
      return this.dataService.getCount(params)
        .pipe(tap(count => {
          this.length = count;
        }));
    }
    return of(0);
  }

  getSelectedRows() {
    const gridRecords: Array<FileRecord> = this.gridApi.getSelectedRows() as Array<FileRecord>;
    return this.buildSLX(gridRecords);
  }

  selectionChanged(rows) {
    const gridRecords: Array<FileRecord> = rows as Array<FileRecord>;

    this.onSelectionChanged.emit(this.buildSLX(gridRecords));
  }

  reloadGrid() {
    this.router.navigate(['layout/results']).then(() => {
      this.data = null;
      this.change.emit('reload_data');
    });
  }

  removeRecords(fileKeys: FileKeys[]) {
    this.onRemoveRecords.emit(fileKeys);
  }

  buildSLX(gridItems: Array<FileRecord>): Array<SelectionItem> {
    const selectionItems = new Array<SelectionItem>();
    const detailedInfo = gridItems.forEach(gridItem => {
      const key = gridItem.SCHEMA_S_FILEID.toUpperCase() + '.' + gridItem.SCHEMA_S_MAJREV + '.' + gridItem.SCHEMA_S_MINREV;
      // tslint:disable-next-line:no-shadowed-variable
      const detailedInfo = new DetailedInfo();
      detailedInfo.filename = gridItem.SCHEMA_S_LONGNAME;
      detailedInfo.bGRev = gridItem.SCHEMA_S_GREV === 'T' ? true : false;
      detailedInfo.opFlag = gridItem.SCHEMA_S_OPFLAG as ApiTypes.OPFLAG;
      detailedInfo.status = gridItem.SCHEMA_S_STATUS;
      detailedInfo.libId = gridItem.SCHEMA_S_LIBID;
      detailedInfo.userId = gridItem.SCHEMA_S_USERID;
      detailedInfo.lastUserId = gridItem.SCHEMA_S_LSTOWNID;
      detailedInfo.targetId = gridItem.SCHEMA_S_PATHID;
      detailedInfo.workflowId = gridItem.SCHEMA_S_WFID;
      detailedInfo.workflowStepId = gridItem.SCHEMA_S_STEPID;
      detailedInfo.defaultWorkflowId = gridItem.SCHEMA_S_DEFWFID;
      detailedInfo.originatorId = gridItem.SCHEMA_S_ORIGID;
      detailedInfo.fileUtc = gridItem.SCHEMA_S_FILEUTC;
      detailedInfo.fileSize = gridItem.SCHEMA_S_FILESIZE;
      detailedInfo.linkType = gridItem.SCHEMA_S_LINKED as ApiTypes.ADLINKTYPE;
      detailedInfo.bIsParent = gridItem.SCHEMA_S_PARENT === 'T' ? true : false;
      detailedInfo.bIsChild = gridItem.SCHEMA_S_CHILD === 'T' ? true : false;
      detailedInfo.libName = gridItem.SCHEMA_S_LIBNAME;
      detailedInfo.activeWorkflowName = gridItem.SCHEMA_S_WFNAME;
      detailedInfo.activeStepName = gridItem.SCHEMA_S_STEPNAME;
      detailedInfo.menuEnables = this.menuEnables[key];

      const selectionitem: SelectionItem = {
        filename: gridItem.SCHEMA_S_LONGNAME,
        sortval: gridItem.SCHEMA_S_LONGNAME,
        tableNumber: +gridItem.SCHEMA_S_SRCDB,
        fileId: gridItem.SCHEMA_S_FILEID,
        majRev: +gridItem.SCHEMA_S_MAJREV,
        minRev: +gridItem.SCHEMA_S_MINREV,
        detailedInfo: detailedInfo,
        docId: null,
        commandParams: new CommandParams(),
      };

      selectionItems.push(selectionitem);
    });
    return selectionItems;
  }

  get sort(): any {
    if (!this._sort) {
      const sort = localStorage.getItem('gridSort');
      if (sort && sort !== 'undefined') {
        this._sort = JSON.parse(sort);
      } else {
        this._sort = { colId: 'SCHEMA_S_LONGNAME', sort: 'asc' };
      }
    }
    return this._sort;
  }

  set sort(newSort: any) {
    localStorage.setItem('gridSort', JSON.stringify(newSort));
    this._sort = newSort;
  }

  get pageIndex(): number {
    if (!this._pageIndex) {
      // tslint:disable-next-line:radix
      const pageIndex = parseInt(localStorage.getItem('pageIndex'));
      if (pageIndex) {
        this._pageIndex = pageIndex;
      } else {
        this._pageIndex = 0;
      }
    }

    return this._pageIndex;
  }

  set pageIndex(pageIndex: number) {
    localStorage.setItem('pageIndex', JSON.stringify(pageIndex));
    this._pageIndex = pageIndex;
  }

  set pageSize(pageSize: number) {
    localStorage.setItem('pageSize', JSON.stringify(pageSize));
    this._pageSize = pageSize;
  }

  get pageSize(): number {
    if (!this._pageSize) {
      // tslint:disable-next-line:radix
      const pageSize = parseInt(localStorage.getItem('pageSize'));
      if (pageSize) {
        this._pageSize = pageSize;
      } else {
        this._pageSize = 100;
      }
    }
    return this._pageSize;
  }
}
