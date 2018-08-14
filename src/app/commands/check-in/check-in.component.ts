import { Component, OnInit, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule } from '@angular/forms'
import { LocalizationService } from '../../localization/localization.service';
import { SelectionItem } from '../../classes/selectionitem';
import { GridOptions } from 'ag-grid';
import { CheckInOptions } from '../../classes/checkinoptions';
import { CheckInService } from './check-in.service';
import { FileInfoModel } from '../../classes/fileinfos';
import { switchMap, map, concatMap, takeLast, finalize } from 'rxjs/operators';
import { Observable, from, of } from 'rxjs';
import { SelectionListXfer } from '../../classes/selectionlist';
import { ApiTypes } from '../../classes/ApiTypes';
import { AuthService } from '../../login/auth.service';
import { GridItem } from './classes/grid-item';
import { PreCheckInItemObject } from '../../classes/checkinitem';
import { ConfirmDialogService } from '../confirm-dialog/confirm-dialog.service';
import { ErrorDialogService } from '../../error-dialog/error-dialog.service';
import { ErrorCode } from '../../classes/error-codes';
import { ExtractionService } from '../extraction/extraction.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.less'],
})
export class CheckInComponent implements OnInit {
  private gridOptions: GridOptions;
  bReadyForOk: boolean = false;
  processing: boolean = false;
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
    loseDataCardChanges: "",
  }
  resultSLX: SelectionListXfer = new SelectionListXfer();

  ACN_SIGN_IN = 101;
  xyz = {
    bReadyForOK: false,
    bEnableLibPicker: true,
    selectedLibraryItem: {},
    bKeepOut: false,
    bUndoCheckOut: false,
    bCreateVersion: false,
    bAllowUndoCheckOut: false,
    selectedUserItem: { name: "", id: "" },
    gettingUserList: false,
  };

  constructor(
    public dialogRef: MatDialogRef<CheckInComponent>,
    private locale: LocalizationService,
    private auth: AuthService,
    private confirmDialogService: ConfirmDialogService,
    @Inject(MAT_DIALOG_DATA) public selectionItems: SelectionItem[],
    private extractionService: ExtractionService,
    private checkInService: CheckInService, private errorDialogService: ErrorDialogService) {

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

  currentFile: string = "Filename.xls";
  onCheckInDialogOK() {
    this.processing = true;
    this.auth.setLongTermKey().subscribe(resp => {
      from(this.rowData).pipe(concatMap(item => {
        return this.checkForUndoCheckOut(item).pipe(switchMap(res => {
          if (res) {
            //initialize pre check-in object
            const preCheckInItem: PreCheckInItemObject = { fileId: item.fileId, libId: item.selectionItem.detailedInfo.libId, stagingFileOperationPacket: null };

            //Get access path
            return this.checkInService.getAccessPath(item.selectionItem).pipe(switchMap(res => {
              //test the access path
              return this.checkInService.testAccess(res).pipe(switchMap(result => {
                //if error
                if (!result) {
                  let ec = ErrorCode.ECFILEBUSY;
                  return this.checkInService.errorCode(item.selectionItem, ec).pipe(map(res => {
                    this.resultSLX.list.push(res);
                  }));
                }
                else {
                  //proceed with pre-checkin
                  return this.checkInService.preCheckInItem(preCheckInItem).pipe(switchMap(res => {
                    //staging
                    return this.checkInService.processFileOperation(preCheckInItem.stagingFileOperationPacket).pipe(switchMap(res => {
                      if (item.selectionItem.detailedInfo.linkType == ApiTypes.ADLINKTYPE.LT_LINKED) {
                        //check detailedInfo for libid, if NOT ADEPT_NULL_ID then use it, otherwise use the commandParams eLibId
                        let libId = "";
                        if (item.selectionItem.detailedInfo.libId != "ADEPT_NULL_LIBID" && item.selectionItem.detailedInfo.libId != "") {
                          libId = item.selectionItem.detailedInfo.libId;
                        }
                        else {
                          libId = item.selectionItem.commandParams.eLibId;
                        }

                        return this.extractionService.extractionRequired(item, libId).pipe(switchMap(res => {
                          if (res.RequireExtraction || res.RequireFTSExtraction) {
                            return of(2);
                            //return this.extractionService.extractItem()
                          }
                        }));
                      }
                    }));
                  }));
                }


              }))
            }));
          }
        }))
      }), finalize(() => {
        console.log("finalizing");

      })).subscribe();

    });
    console.log("OK");
  }


  checkForUndoCheckOut(gridItem: GridItem): Observable<boolean> {
    if (gridItem.bUndoCheckOut == "T") {
      if (gridItem.bFileHasChanged == "T") {
        // This should not happen.
        this.errorDialogService.showError("Internal Error", "UndoCheckOut cannot be used with HasFileChanged");
        // This item is done.
        return of(false);
      }
      else if (gridItem.bDataCardHasChanged == "T") {
        // If YtoAll, then fall through to checkInItem.
        if (this.answers.loseDataCardChanges != 'YtoAll') {
          if (this.answers.loseDataCardChanges == 'NtoAll') {
            of(false);
          }
          // Ask 'Are you sure?' with Y/N/YtoAll/NtoAll
          let messages = [this.locale.resourceStrings["LOSE_DATA_CARD_CHANGES"]];
          messages.push(this.locale.resourceStrings["DATA_CARD_CHANGES_WILL_BE_LOST"]);
          return this.confirmDialogService.Open("Confirm", messages).pipe(switchMap(res => {
            this.answers.loseDataCardChanges = res;
            if (res = 'Y' || res == "YtoAll") {
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
    var allColumnIds = [];
    this.gridOptions.columnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.getId());
    });
    this.gridOptions.columnApi.autoSizeColumns(allColumnIds);
    return this.checkInService.getCheckInOptionsList(this.selectionItems).pipe(switchMap(options => {

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

      return this.checkInService.getFileInfos(this.fileInfoList).pipe(map(fileInfos => {
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
            name: item.filename,
            library: item.detailedInfo.libName,
            status: item.detailedInfo.status,
            opFlag: item.detailedInfo.opFlag,
            previousUTC: previousUTC,
            currentUTC: currentUTC,
            bKeepOut: 'F',
            bFileHasChanged: previousUTC == currentUTC ? 'F' : 'T',
            bDataCardHasChanged: this.bDataCardHasChanged[item.fileId] ? 'T' : 'F',
            bUndoCheckOut: 'F',
            bWillCreateVersion: this.bWillCreateVersion[item.fileId] ? 'T' : 'F',
            bCanCreateVersion: this.bCanCreateVersion[item.fileId] ? 'T' : 'F',
            bCreateVersion: 'F',
            assignTo: "",
            assignToUserId: "",
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
    let selectionItems: SelectionItem[] = [];
    selected.forEach(item => {
      item.isSelected = true;
      let selectionItem = item.selectionItem as SelectionItem;
      selectionItems.push(selectionItem);

      if (selectionItem.detailedInfo.opFlag != ApiTypes.OPFLAG.O_OUT)
        bSomethingIsNew = true;
    });

    if (bSomethingIsNew)
      this.xyz.bEnableLibPicker = true;
    else
      this.xyz.bEnableLibPicker = false;

    let slx: SelectionListXfer = {
      mode: ApiTypes.SELECTION_LIST_MODE.SL_WIP,
      order: ApiTypes.SELECTION_LIST_ORDER.SL_FILENAME,
      list: selectionItems
    }

    // ============================
    // Select Item. Assign To.
    // ===========================+
    // Add users to the combo.
    this.qualifiedUsersArrayLoading();
    if (selectionItems.length < 1) {
      this.qualifiedUsersArrayLoad(null);
    }
    else {
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
    if (this.xyz.selectedUserItem == null)
      return;
    // If user selected 'pick one', then return.
    if (this.xyz.selectedUserItem == this.qualifiedUsersPickOne)
      return;

    var nameForGrid = this.xyz.selectedUserItem.name;
    // EDGE-EMPTY
    if (this.xyz.selectedUserItem.name.length < 1) {
      var browserInfo = navigator.userAgent;
      var bIsEdge = browserInfo.indexOf('Edge/') != -1;
      if (bIsEdge) {
        // scope.xyz.selectedUserItem.name = '\u00A0';
        nameForGrid = '\u00A0';
      }
    }

    // Walk the grid's selected items.
    this.rowData.forEach(item => {
      // Get this selected item.
      if (item.isSelected) {
        let rowNode = this.gridOptions.api.getRowNode(item.fileId);
        item.assignToUserId = this.xyz.selectedUserItem.id;
        item.assignTo = nameForGrid; // scope.xyz.selectedUserItem.name;
        item.selectionItem.commandParams.eAssignToUserId = this.xyz.selectedUserItem.id;
        rowNode.setData(item);
      }
    });

    // Do Enables.
    this.doEnables();
  };

  //
  // On check/uncheck of the Keep Out checkbox.
  //
  keepOutCheckChanged() {
    // Walk the grid's selected items.
    this.rowData.forEach(item => {
      // Get this selected item.
      if (item.isSelected) {
        item.bKeepOut = this.xyz.bKeepOut ? "T" : "F";
        item.selectionItem.commandParams.ebKeepOut = this.xyz.bKeepOut; // *****
      }
    });
    // Do Enables.
    this.doEnables();
  };

  //
  // On check/uncheck of the Keep Out checkbox.
  //
  undoCheckOutCheckChanged() {
    // Walk the grid's selected items.
    this.rowData.forEach(item => {
      if (item.isSelected && item.bFileHasChanged == 'F') {
        item.bUndoCheckOut = this.xyz.bUndoCheckOut ? "T" : "F";
        item.selectionItem.commandParams.ebUndoCheckOut = this.xyz.bUndoCheckOut; // *****
      }
    });

    // Do Enables.
    this.doEnables();
  };

  //
  // On check/uncheck of the Create Version checkbox.
  //
  createVersionCheckChanged() {
    // Walk the grid's selected items.
    this.rowData.forEach(item => {
      if (item.isSelected && item.bCanCreateVersion == 'T') {
        item.bCreateVersion = this.xyz.bCreateVersion ? "T" : "F";
        item.selectionItem.commandParams.ebMakeRevision = this.xyz.bCreateVersion; // *****
      }
    })
    // Do Enables.
    this.doEnables();
  };

  qualifiedUsersArrayLoading() {
    // If already on the 'building list', just leave it.
    if (this.xyz.selectedUserItem != this.qualifiedUsersBuildingList) {
      // Clear the array.
      this.qualifiedUsersArray = [];
      // Add 'building list' to the array.
      this.qualifiedUsersArray.push(this.qualifiedUsersBuildingList);
      // Select 'building list' in the combo.
      this.xyz.selectedUserItem = this.qualifiedUsersBuildingList;
      // We are waiting for the items.
      this.xyz.gettingUserList = true;
    }
  };

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
      for (let [id, name] of Object.entries(users)) {
        this.qualifiedUsersArray.push({ id: id, name: users[id] });
      }
    }
    // We are done getting the items.
    this.xyz.gettingUserList = false;
  }

  // Create a 'building list' item.
  qualifiedUsersBuildingList = { id: 'building_list', name: "- " + this.locale.resourceStrings["COMBO_BOX_BUILDING_LIST"] + " -" };
  // Create a 'pick one' item.
  qualifiedUsersPickOne = { id: 'pick_one', name: "- " + this.locale.resourceStrings["COMBO_BOX_PICK_ONE"] + " -" };
  // Create a '' item.
  qualifiedUsersBlank = { id: '', name: '' };

  //
  // Enables.
  //
  doEnables() {
    // Handle enabling OK.
    this.xyz.bReadyForOK = false;
    var len = this.gridOptions.api.getSelectedRows().length;
    for (var i = 0; i < len; i++) {
      // Get this item.
      var gridItem = this.gridOptions.api.getSelectedRows()[i];
      if (gridItem.library == null)
        return;
      if (gridItem.library.length < 1)
        return;
    }
    this.xyz.bReadyForOK = true;
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

  openConfirm() {

  }

}
