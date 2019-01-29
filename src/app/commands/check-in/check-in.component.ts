import { Component, OnInit, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { switchMap, map, concatMap, takeLast, finalize, zip } from 'rxjs/operators';
import { Observable, from, of, throwError } from 'rxjs';
import { ConfirmDialogService } from '../confirm-dialog/confirm-dialog.service';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';
import {
  GridItem,
  CheckInOptions,
  FileInfoModel,
  SelectionListXfer,
  NtfItemXfer,
  AuthService,
  SelectionItem,
  PreCheckInItemObject,
  FileOperationModel,
  FileRecord,
  FileKeys,
  ErrorCode,
  ApiTypes,
  CheckInService,
  LocalizationService,
  GridService,
  ExtractionService
} from 'projects/ui-api/src';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.less'],
})
export class CheckInComponent implements OnInit {
  public gridOptions: GridOptions;
  bReadyForOk = false;
  processing = false;
  rowData: GridItem[] = [];
  columnDefs = [];
  checkInOptions: Array<CheckInOptions> = [];
  fileInfoList: Array<FileInfoModel> = [];
  previousUTCs = {};
  bDataCardHasChanged = {};
  bWillCreateVersion = {};
  bCanCreateVersion = {};
  currentUTCs = {};
  qualifiedUsersArray = [];
  libraries = [];
  answers = {
    loseDataCardChanges: '',
  };
  resultSLX: SelectionListXfer = new SelectionListXfer();
  resultNtfItemXfers: NtfItemXfer[] = [];

  ACN_SIGN_IN = 101;
  xyz = {
    bReadyForOK: false,
    bEnableLibPicker: true,
    selectedLibraryItem: {},
    bKeepOut: false,
    bUndoCheckOut: false,
    bCreateVersion: false,
    bAllowUndoCheckOut: false,
    selectedUserItem: { name: '', id: '' },
    gettingUserList: false,
  };
  progressValue = 0;
  currentFile = '';

  constructor(
    public dialogRef: MatDialogRef<CheckInComponent>,
    public locale: LocalizationService,
    private auth: AuthService,
    private confirmDialogService: ConfirmDialogService,
    @Inject(MAT_DIALOG_DATA) public selectionItems: SelectionItem[],
    private extractionService: ExtractionService,
    private checkInService: CheckInService, private errorDialogService: ErrorDialogService,
    private gridService: GridService,
  ) {

    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowSelection = 'multiple';
    this.gridOptions.rowDeselection = true;
    this.gridOptions.enableColResize = true;
  }

  ngOnInit() {
    this.initColumns();
    // Initailize to the 'building list' state.
    this.qualifiedUsersArrayLoading();

    this.checkInService.getAllowUndoCheckOut({}).subscribe(resp => {
      this.xyz.bAllowUndoCheckOut = resp;
    });
  }

  onCheckInDialogOK() {
    // tslint:disable-next-line:no-console
    console.time('checkin-total');
    this.processing = true;
    this.auth.setLongTermKey().subscribe(resp => {
      const itemValue = Math.ceil(100 / this.rowData.length);
      from(this.rowData).pipe(concatMap(item => {
        this.currentFile = item.name;
        // tslint:disable-next-line:no-console
        console.time('checkin-item');
        return this.checkForUndoCheckOut(item).pipe(switchMap(proceed => {
          if (proceed) {
            // check for path
            return this.checkForPath(item).pipe(switchMap(pathOk => {
              // if path is ok, proceed with precheck-in
              if (pathOk) {
                // initialize pre check-in object
                // tslint:disable-next-line:max-line-length
                const preCheckInItem: PreCheckInItemObject = { fileId: item.fileId, libId: item.selectionItem.detailedInfo.libId, stagingFileOperationPacket: null };
                // proceed with pre-checkin
                return this.checkInService.preCheckInItem(preCheckInItem).pipe(switchMap(preCheckInResponse => {
                  // staging
                  // tslint:disable-next-line:max-line-length
                  return this.checkInService.processFileOperation(preCheckInResponse.stagingFileOperationPacket).pipe(switchMap(fileOperationPacket => {
                    // process extraction
                    return this.extractionService.processExtraction(item).pipe(switchMap(res => {

                      let fileOperation: FileOperationModel = null;
                      if (fileOperationPacket && fileOperationPacket.fileOperations.length > 0) {
                        fileOperation = fileOperationPacket.fileOperations[0];
                      }
                      // check in item
                      return this.checkInService.checkInItem(item, fileOperation)
                        .pipe(switchMap(selectionResult => {
                          // update results objects
                          if (selectionResult.slx.list) {
                            selectionResult.slx.list.forEach(i => {
                              this.resultSLX.list.push(i);
                            });
                          }
                          if (selectionResult.ntfItemXfers) {
                            selectionResult.ntfItemXfers.forEach(i => {
                              this.resultNtfItemXfers.push(i);
                            });
                          }
                          // Final file ops.
                          // Could be a delete item here.
                          // Call ACS to do the file operation.
                          return this.checkInService.processFileOperation(selectionResult.fileOperationPacket)
                            .pipe(map(res => {
                              return res;
                            }));
                        }));
                    }));
                  }));
                }));
              }
              // path check failed, move on to the next item
              return null;
            }));
          }
          // finished with this item

          return null;
        }));
      }), finalize(() => {
        // when everything is done
        // tslint:disable-next-line:no-console
        console.timeEnd('checkin-total');
        this.auth.removeLongTermKey();

        // remove the records from the grid.
        const recordsToRemove = this.rowData.map(item => {
          const file: FileRecord = new FileRecord();
          file.SCHEMA_S_FILEID = item.selectionItem.fileId;
          file.SCHEMA_S_MAJREV = item.selectionItem.majRev;
          file.SCHEMA_S_MINREV = item.selectionItem.minRev;
          return new FileKeys(file);
        });
        this.gridService.removeRecords(recordsToRemove);

        // close the dialog
        this.dialogRef.close();
      })).subscribe(() => {
        // update progress
        this.progressValue = this.progressValue + itemValue;
        // tslint:disable-next-line:no-console
        console.timeEnd('checkin-item');
      });
    });
    console.log('OK');
  }

  checkForPath(gridItem: GridItem) {
    // Get access path
    return this.checkInService.getAccessPath(gridItem.selectionItem).pipe(switchMap(res => {
      // test the access path
      if (res) {
        return this.checkInService.testAccess(res).pipe(switchMap(result => {
          // if error, process error
          if (!result) {
            const ec = ErrorCode.ECFILEBUSY;
            this.checkInService.errorCode(gridItem.selectionItem, ec).pipe(map(res => {
              this.resultSLX.list.push(res);
              // return false, stop processing
              return of(false);
            }));
          } else {
            return of(result);
          }
        }));
      } else {
        // no access path
        return of(true);
      }
    }));
  }

  checkForUndoCheckOut(gridItem: GridItem): Observable<boolean> {
    if (gridItem.bUndoCheckOut === 'T') {
      if (gridItem.bFileHasChanged === 'T') {
        // This should not happen.
        this.errorDialogService.showError('Internal Error', 'UndoCheckOut cannot be used with HasFileChanged');
        // This item is done.
        return of(false);
      } else if (gridItem.bDataCardHasChanged === 'T') {
        // If YtoAll, then fall through to checkInItem.
        if (this.answers.loseDataCardChanges !== 'YtoAll') {
          if (this.answers.loseDataCardChanges === 'NtoAll') {
            of(false);
          }
          // Ask 'Are you sure?' with Y/N/YtoAll/NtoAll
          const messages = [this.locale.resourceStrings['LOSE_DATA_CARD_CHANGES']];
          messages.push(this.locale.resourceStrings['DATA_CARD_CHANGES_WILL_BE_LOST']);
          return this.confirmDialogService.Open('Confirm', messages).pipe(switchMap(res => {
            this.answers.loseDataCardChanges = res;
            if (res = 'Y' || res === 'YtoAll') {
              return of(true);
            }
            return of(false);
          }));
        }
      }
    }
    return of(true);
  }


  onCheckInDialogCancel() {
    this.dialogRef.close();
  }

  onGridReady() {
    this.setGridData().subscribe(r => {
      this.gridOptions.api.selectAll();
      this.doEnables();
    });
  }

  getRowNodeId(data) {
    return data.fileId;
  }

  setGridData(): Observable<any> {
    this.gridOptions.api.showLoadingOverlay();
    const allColumnIds = [];
    this.gridOptions.columnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.getId());
    });
    this.gridOptions.columnApi.autoSizeColumns(allColumnIds);
    return this.checkInService.getCheckInOptionsList(this.selectionItems).pipe(switchMap(options => {

      options.forEach(opt => {
        this.fileInfoList.push({
          fileId: opt.fileId,
          filePNE: opt.filePNE,
          lastWriteTimeUTC: ''
        });
        this.previousUTCs[opt.fileId] = opt.previousUTC;
        this.bDataCardHasChanged[opt.fileId] = opt.bDataCardHasChanged;
        this.bWillCreateVersion[opt.fileId] = opt.bWillCreateVersion;
        this.bCanCreateVersion[opt.fileId] = opt.bCanCreateVersion;
      });

      return this.checkInService.getFileInfos(this.fileInfoList).pipe(map(fileInfos => {
        fileInfos.forEach(fileInfo => {
          this.currentUTCs[fileInfo.fileId] = fileInfo.lastWriteTimeUTC;
        });

        let index = 0;

        this.selectionItems.forEach(item => {
          const previousUTC = this.previousUTCs[item.fileId];
          const currentUTC = this.currentUTCs[item.fileId];
          item.commandParams.eLibId = item.detailedInfo.libId;

          this.rowData.push({
            index: index,
            selectionItem: item,
            isSelected: true,
            fileId: item.fileId,
            name: item.filename,
            library: item.detailedInfo.libName,
            status: item.detailedInfo.status,
            opFlag: item.detailedInfo.opFlag,
            previousUTC: previousUTC,
            currentUTC: currentUTC,
            bKeepOut: 'F',
            bFileHasChanged: previousUTC === currentUTC ? 'F' : 'T',
            bDataCardHasChanged: this.bDataCardHasChanged[item.fileId] ? 'T' : 'F',
            bUndoCheckOut: 'F',
            bWillCreateVersion: this.bWillCreateVersion[item.fileId] ? 'T' : 'F',
            bCanCreateVersion: this.bCanCreateVersion[item.fileId] ? 'T' : 'F',
            bCreateVersion: 'F',
            assignTo: '',
            assignToUserId: '',
          });

          index++;
        });

        this.gridOptions.api.setRowData(this.rowData);
        this.gridOptions.api.hideOverlay();
      }));

    }));
  }

  onSelectionChanged($event) {
    this.rowData.forEach(item => {
      item.isSelected = false;
    });
    const selected = this.gridOptions.api.getSelectedRows();

    let bSomethingIsNew = false;
    const selectionItems: SelectionItem[] = [];
    selected.forEach(item => {
      item.isSelected = true;
      const selectionItem = item.selectionItem as SelectionItem;
      selectionItems.push(selectionItem);

      if (selectionItem.detailedInfo.opFlag !== ApiTypes.OPFLAG.O_OUT) {
        bSomethingIsNew = true;
      }
    });

    if (bSomethingIsNew) {
      this.xyz.bEnableLibPicker = true;
    } else {
      this.xyz.bEnableLibPicker = false;
    }

    const slx: SelectionListXfer = {
      mode: ApiTypes.SELECTION_LIST_MODE.SL_WIP,
      order: ApiTypes.SELECTION_LIST_ORDER.SL_FILENAME,
      list: selectionItems
    };

    // ============================
    // Select Item. Assign To.
    // ===========================+
    // Add users to the combo.
    this.qualifiedUsersArrayLoading();
    if (selectionItems.length < 1) {
      this.qualifiedUsersArrayLoad(null);
    } else {
      this.checkInService.getUserListForAssign(ApiTypes.AdeptCommandNumber.ACN_SIGN_IN, slx)
        .subscribe(users => {
          this.qualifiedUsersArrayLoad(users);
        }, function () {
          this.qualifiedUsersArrayLoad();
        });
    }

    // Do Enables.
    this.doEnables();
  }

  //
  // On user change.
  //
  selectedUserChanged($event) {
    // If nothing selected, then return.
    if (this.xyz.selectedUserItem == null) {
      return;
    }
    // If user selected 'pick one', then return.
    if (this.xyz.selectedUserItem === this.qualifiedUsersPickOne) {
      return;
    }

    let nameForGrid = this.xyz.selectedUserItem.name;
    // EDGE-EMPTY
    if (this.xyz.selectedUserItem.name.length < 1) {
      const browserInfo = navigator.userAgent;
      const bIsEdge = browserInfo.indexOf('Edge/') !== -1;
      if (bIsEdge) {
        // scope.xyz.selectedUserItem.name = '\u00A0';
        nameForGrid = '\u00A0';
      }
    }

    // Walk the grid's selected items.
    this.rowData.forEach(item => {
      // Get this selected item.
      if (item.isSelected) {
        const rowNode = this.gridOptions.api.getRowNode(item.fileId);
        item.assignToUserId = this.xyz.selectedUserItem.id;
        item.assignTo = nameForGrid; // scope.xyz.selectedUserItem.name;
        item.selectionItem.commandParams.eAssignToUserId = this.xyz.selectedUserItem.id;
        rowNode.setData(item);
      }
    });

    // Do Enables.
    this.doEnables();
  }

  selectedLibraryChanged() {

  }

  //
  // On check/uncheck of the Keep Out checkbox.
  //
  keepOutCheckChanged() {
    // Walk the grid's selected items.
    this.rowData.forEach(item => {
      // Get this selected item.
      if (item.isSelected) {
        item.bKeepOut = this.xyz.bKeepOut ? 'T' : 'F';
        item.selectionItem.commandParams.ebKeepOut = this.xyz.bKeepOut; // *****
      }
    });
    // Do Enables.
    this.doEnables();
  }

  //
  // On check/uncheck of the Keep Out checkbox.
  //
  undoCheckOutCheckChanged() {
    // Walk the grid's selected items.
    this.rowData.forEach(item => {
      if (item.isSelected && item.bFileHasChanged === 'F') {
        item.bUndoCheckOut = this.xyz.bUndoCheckOut ? 'T' : 'F';
        item.selectionItem.commandParams.ebUndoCheckOut = this.xyz.bUndoCheckOut; // *****
      }
    });

    // Do Enables.
    this.doEnables();
  }

  //
  // On check/uncheck of the Create Version checkbox.
  //
  createVersionCheckChanged() {
    // Walk the grid's selected items.
    this.rowData.forEach(item => {
      if (item.isSelected && item.bCanCreateVersion === 'T') {
        item.bCreateVersion = this.xyz.bCreateVersion ? 'T' : 'F';
        item.selectionItem.commandParams.ebMakeRevision = this.xyz.bCreateVersion; // *****
      }
    });
    // Do Enables.
    this.doEnables();
  }

  qualifiedUsersArrayLoading() {
    // If already on the 'building list', just leave it.
    if (this.xyz.selectedUserItem !== this.qualifiedUsersBuildingList) {
      // Clear the array.
      this.qualifiedUsersArray = [];
      // Add 'building list' to the array.
      this.qualifiedUsersArray.push(this.qualifiedUsersBuildingList);
      // Select 'building list' in the combo.
      this.xyz.selectedUserItem = this.qualifiedUsersBuildingList;
      // We are waiting for the items.
      this.xyz.gettingUserList = true;
    }
  }

  // Load items into the combo. May be null.
  qualifiedUsersArrayLoad = function (users) {
    // Clear the array.
    this.qualifiedUsersArray = [];
    // Add 'pick one'.
    this.qualifiedUsersArray.push(this.qualifiedUsersPickOne);
    // Select 'pick one'.
    this.xyz.selectedUserItem = this.qualifiedUsersPickOne;
    // Add ''.
    this.qualifiedUsersArray.push(this.qualifiedUsersBlank);
    // If there are items, ...
    if (users != null) {
      // Walk the items, ...
      for (const [id, name] of Object.entries(users)) {
        this.qualifiedUsersArray.push({ id: id, name: users[id] });
      }
    }
    // We are done getting the items.
    this.xyz.gettingUserList = false;
  };

  // Create a 'building list' item.
  // tslint:disable-next-line:member-ordering
  qualifiedUsersBuildingList = { id: 'building_list', name: '- ' + this.locale.resourceStrings['COMBO_BOX_BUILDING_LIST'] + ' -' };
  // Create a 'pick one' item.
  // tslint:disable-next-line:member-ordering
  qualifiedUsersPickOne = { id: 'pick_one', name: '- ' + this.locale.resourceStrings['COMBO_BOX_PICK_ONE'] + ' -' };
  // Create a '' item.
  // tslint:disable-next-line:member-ordering
  qualifiedUsersBlank = { id: '', name: '' };

  //
  // Enables.
  //
  doEnables() {
    // Handle enabling OK.
    this.xyz.bReadyForOK = false;
    const len = this.gridOptions.api.getSelectedRows().length;
    for (let i = 0; i < len; i++) {
      // Get this item.
      const gridItem = this.gridOptions.api.getSelectedRows()[i];
      if (gridItem.library == null) {
        return;
      }
      if (gridItem.library.length < 1) {
        return;
      }
    }
    this.xyz.bReadyForOK = true;
  }

  initColumns() {
    this.columnDefs = [
      {
        headerName: this.locale.resourceStrings['SCHEMA_S_LONGNAME'],
        field: 'name',
        width: 150
      },
      {
        headerName: this.locale.resourceStrings['SCHEMA_S_LIBNAME'],
        field: 'library',
        width: 150
      },
      {
        headerName: this.locale.resourceStrings['SCHEMA_S_STATUS'],
        field: 'status',
        width: 80,
      },
      {
        headerName: this.locale.resourceStrings['ASSIGN_TO'],
        field: 'assignTo',
        width: 100
      },
      {
        headerName: this.locale.resourceStrings['FILE_CHANGED'],
        field: 'bFileHasChanged',
        width: 90
      },
      {
        headerName: this.locale.resourceStrings['DATA_CARD_CHANGED'],
        field: 'bDataCardHasChanged',
        width: 90
      },
      {
        headerName: this.locale.resourceStrings['UNDO_CHECKOUT_LABEL'],
        field: 'bUndoCheckOut',
        width: 80
      },
      {
        headerName: this.locale.resourceStrings['KEEP_OUT_LABEL_SHORT'],
        field: 'bKeepOut',
        width: 90
      },
      {
        headerName: this.locale.resourceStrings['CREATE_VERSION'],
        field: 'bCreateVersion',
        width: 90
      }
    ];
  }

  openConfirm() {
    const messages = [this.locale.resourceStrings['LOSE_DATA_CARD_CHANGES']];
    messages.push(this.locale.resourceStrings['DATA_CARD_CHANGES_WILL_BE_LOST']);
    const subs = this.confirmDialogService.Open('Confirm', messages).subscribe(r => {
      console.log('result:', r);
      subs.unsubscribe();
    });
  }

}
