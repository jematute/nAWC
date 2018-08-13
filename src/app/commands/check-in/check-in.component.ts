import { Component, OnInit, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LocalizationService } from '../../localization/localization.service';
import { SelectionItem } from '../../classes/selectionitem';
import { GridOptions } from 'ag-grid';
import { CheckInOptions } from '../../classes/checkinoptions';
import { CheckInService } from './check-in.service';
import { FileInfoModel } from '../../classes/fileinfos';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.less']
})
export class CheckInComponent implements OnInit {
  private gridOptions: GridOptions;
  bReadyForOk: boolean = false;
  processing: boolean = false;
  rowData = [];
  columnDefs = [];
  checkInOptions: Array<CheckInOptions> = [];
  fileInfoList: Array<FileInfoModel> = [];
  previousUTCs = {};
  bDataCardHasChanged = {};
  bWillCreateVersion = {};
  bCanCreateVersion = {};
  currentUTCs = {};

  cities1 = [{ name: 'New York' }, { name: 'Philadelphia' }, { name: 'Boston' }, { name: 'Baltimore' }];

  constructor(
    public dialogRef: MatDialogRef<CheckInComponent>,
    private locale: LocalizationService,
    @Inject(MAT_DIALOG_DATA) public selectionItems: SelectionItem[], private checkInService: CheckInService) { 

      this.gridOptions = < GridOptions > {};
    }

  ngOnInit() {
    this.initColumns();



    console.log("selection items:", this.selectionItems)
  }

  onCheckInDialogOK() {
    console.log("OK");
  }

  onCheckInDialogCancel() {
    this.dialogRef.close();
  }

  onGridReady() {
    console.log("grid ready");
    this.setGridData();
  }

  setGridData() {
    this.gridOptions.api.showLoadingOverlay();
    var allColumnIds = [];
    this.gridOptions.columnApi.getAllColumns().forEach(function(column) {
        allColumnIds.push(column.getId());
    });
    this.gridOptions.columnApi.autoSizeColumns(allColumnIds);
    this.checkInService.getCheckInOptionsList(this.selectionItems).subscribe(options => {

      options.forEach(opt => {
        this.fileInfoList.push({
          fileId: opt.fileId,
          filePNE: opt.filePNE,
          lastWriteTimeUTC: ""
        });
        this.previousUTCs[opt.fileId] = opt.previousUTC;
        this.bDataCardHasChanged[opt.fileId] = opt.bDataCardHasChanged;
        this.bWillCreateVersion[opt.fileId] = opt.bWillCreateVersion;
        this.bCanCreateVersion[opt.fileId] = opt.bCanCreateVersion;
      });

      this.checkInService.getFileInfos(this.fileInfoList).subscribe(fileInfos => {
        fileInfos.forEach(fileInfo => {
          this.currentUTCs[fileInfo.fileId] = fileInfo.lastWriteTimeUTC;
        });

        let index = 0;

        this.selectionItems.forEach(item => {
          let previousUTC = this.previousUTCs[item.fileId];
          let currentUTC = this.currentUTCs[item.fileId];
          item.commandParams.eLibId = item.detailedInfo.libId;

          this.rowData.push({
            index: index,
            selectionItem: item,
            isSelected: true,
            fileId: item.fileId,
            name: item.filename, library: item.detailedInfo.libName, status: item.detailedInfo.status, opFlag: item.detailedInfo.opFlag,
            previousUTC: previousUTC,
            currentUTC: currentUTC,
            bKeepOut: 'F',
            bFileHasChanged: previousUTC == currentUTC ? 'F' : 'T',
            bDataCardHasChanged: this.bDataCardHasChanged[item.fileId] ? 'T' : 'F',
            bUndoCheckOut: 'F',
            bWillCreateVersion: this.bWillCreateVersion[item.fileId] ? 'T' : 'F',
            bCanCreateVersion: this.bCanCreateVersion[item.fileId] ? 'T' : 'F', bCreateVersion: 'F'
          });

          index++;
        });

        this.gridOptions.api.setRowData(this.rowData);
        this.gridOptions.api.hideOverlay();
      });

    });
  }

  initColumns() {
    this.columnDefs = [
      {
        headerName: this.locale.resourceStrings["SCHEMA_S_LONGNAME"],
        field: "name",
        width: 150
      },
      {
        headerName: this.locale.resourceStrings["SCHEMA_S_LIBNAME"],
        field: "library",
        width: 150
      },
      {
        headerName: this.locale.resourceStrings["SCHEMA_S_STATUS"],
        field: "status",
        width: 80,
      },
      {
        headerName: this.locale.resourceStrings["ASSIGN_TO"],
        field: "assignTo",
        width: 100
      },
      {
        headerName: this.locale.resourceStrings["FILE_CHANGED"],
        field: "bFileHasChanged",
        width: 90
      },
      {
        headerName: this.locale.resourceStrings["DATA_CARD_CHANGED"],
        field: "bDataCardHasChanged",
        width: 90
      },
      {
        headerName: this.locale.resourceStrings["UNDO_CHECKOUT_LABEL"],
        field: "bUndoCheckOut",
        width: 80
      },
      {
        headerName: this.locale.resourceStrings["KEEP_OUT_LABEL_SHORT"],
        field: "bKeepOut",
        width: 90
      },
      {
        headerName: this.locale.resourceStrings["CREATE_VERSION"],
        field: "bCreateVersion",
        width: 90
      }
    ]
  }

}
