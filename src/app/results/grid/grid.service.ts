import { Injectable, Output, EventEmitter } from '@angular/core';
import { IGridInterface } from './grid-interface';
import { GetDataParams, AdeptDataTable } from '../../classes/getDataParams';
import { Column } from '../../classes/column';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { GridApi } from 'ag-grid';
import { Router } from '@angular/router';
import { SearchParams } from '../../search/search-params';
import { UIEnable } from '../../classes/uirightsandenables';
import { FileRecord } from '../../classes/file-record';
import { SelectionItem, DetailedInfo, CommandParams } from '../../classes/selectionitem';
import { ApiTypes } from '../../classes/ApiTypes';

@Injectable()
export class GridService {

  public gridApi: GridApi;
  public data: AdeptDataTable;
  public length: number = 0;
  public pageSize: number = 100;
  public pageIndex: number;
  public columns: Array<Column>;
  public dataService: IGridInterface;
  @Output() change: EventEmitter<any> = new EventEmitter();
  public loading: EventEmitter<boolean> = new EventEmitter();
  public onSelectionChanged: EventEmitter<Array<SelectionItem>> = new EventEmitter();
  public menuEnables: Map<string, UIEnable>;

  constructor(private router: Router) {
    this.data = new AdeptDataTable();
  }

  getData(params: GetDataParams): Observable<SearchParams> {
    this.loading.emit(true);
    return this.dataService.getData(params)
      .pipe(tap(result => {
        this.data = result.AdeptDataTable
        this.menuEnables = result.MenuEnables;
      }), finalize(() => {
        this.loading.emit(false);
      }));
  }

  getCount(params: GetDataParams) {
    return this.dataService.getCount(params)
      .pipe(tap(count => {
        this.length = count;
      }));
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
    this.router.navigate(["layout/results"]).then(() => {
      this.change.emit("reload_data");
    });
  }

  buildSLX(gridItems: Array<FileRecord>): Array<SelectionItem> {
    let selectionItems = new Array<SelectionItem>();
    let detailedInfo = gridItems.forEach(gridItem => {
      const key = gridItem.SCHEMA_S_FILEID.toUpperCase() + "." + gridItem.SCHEMA_S_MAJREV + "." + gridItem.SCHEMA_S_MINREV;
      let detailedInfo: DetailedInfo = new DetailedInfo();
      detailedInfo.filename = gridItem.SCHEMA_S_LONGNAME;
      detailedInfo.bGRev = gridItem.SCHEMA_S_GREV == "T" ? true : false;
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
      detailedInfo.bIsParent = gridItem.SCHEMA_S_PARENT == "T" ? true : false;
      detailedInfo.bIsChild = gridItem.SCHEMA_S_CHILD == "T" ? true : false;
      detailedInfo.libName = gridItem.SCHEMA_S_LIBNAME;
      detailedInfo.activeWorkflowName = gridItem.SCHEMA_S_WFNAME;
      detailedInfo.activeStepName = gridItem.SCHEMA_S_STEPNAME;
      detailedInfo.menuEnables = this.menuEnables[key]

      let selectionitem: SelectionItem = {
        filename: gridItem.SCHEMA_S_LONGNAME,
        sortval: gridItem.SCHEMA_S_LONGNAME,
        tableNumber: +gridItem.SCHEMA_S_SRCDB,
        fileId: gridItem.SCHEMA_S_FILEID,
        majRev: +gridItem.SCHEMA_S_MAJREV,
        minRev: +gridItem.SCHEMA_S_MINREV,
        detailedInfo: detailedInfo,
        docId: null,
        commandParams: new CommandParams(),
      }

      selectionItems.push(selectionitem);
    })
    return selectionItems;
  }


}
