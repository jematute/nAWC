import { Component, OnInit, Inject, Injector } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormsModule } from '@angular/forms'
import { LocalizationService } from '../../localization/localization.service';
import { SelectionItem } from '../../classes/selectionitem';
import { GridOptions } from 'ag-grid';
import { CheckInOptions } from '../../classes/checkinoptions';
import { CheckInService } from './check-in.service';
import { FileInfoModel } from '../../classes/fileinfos';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SelectionListXfer } from '../../classes/selectionlist';
import { ApiTypes } from '../../classes/ApiTypes';

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
  qualifiedUsersArray = [];
  libraries = [];

  xyz = {
    bReadyForOK: false,
    bEnableLibPicker: true,
    selectedLibraryItem: { name: "", libId: "" },
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
    @Inject(MAT_DIALOG_DATA) public selectionItems: SelectionItem[], private checkInService: CheckInService) {

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
    this.processing = true;
    
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
      }));

    }));
  }

  onSelectionChanged($event) {
    // Always set all items to not selected.
    this.rowData.forEach(item => {
      item.isSelected = false;
    });
    const selected = this.gridOptions.api.getSelectedRows();

    // Get the selected items.
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

    // Build the SL with mode and order.
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
  // On library change.
  //
  selectedLibraryChanged(name, id, item) {
    this.xyz.selectedLibraryItem = item;
    if (this.xyz.selectedLibraryItem == null)
      return;

    //// EDGE-EMPTY
    //if (scope.xyz.selectedLibraryItem.name.length < 1) {
    //    var browserInfo = navigator.userAgent;
    //    var bIsEdge = browserInfo.indexOf('Edge/') != -1;
    //    if (bIsEdge)
    //        scope.xyz.selectedLibraryItem.name = '\u00A0';
    //}

    // checkInOptionsList
    var checkInOptionsList = [];

    // Walk the grid's selected items.
    var len = this.gridOptions.api.getSelectedRows().length;
    for (var i = 0; i < len; i++) {
      // Get this selected item.
      var gridItem = this.gridOptions.api.getSelectedRows()[i];
      //if (gridItem.isSelected) { // FOR TESTING
      if (gridItem.isSelected && (gridItem.opFlag == ApiTypes.OPFLAG.O_DUP || gridItem.opFlag == ApiTypes.OPFLAG.O_NEW)) {
        checkInOptionsList.push({ fileId: gridItem.fileId, libId: this.xyz.selectedLibraryItem.libId });
        gridItem.library = this.xyz.selectedLibraryItem.name;
        gridItem.selectionItem.commandParams.eLibId = this.xyz.selectedLibraryItem.libId; // *****
      }
    }

    // Get options and add to grid.
    this.checkInService.getCheckInOptionsList(checkInOptionsList).subscribe(options => {

      this.bWillCreateVersion = [];
      this.bCanCreateVersion = [];
      options.forEach(option => {
        let fileId = item.fileId;
        let will = item.bWillCreateVersion;
        let can = item.bCanCreateVersion;
        this.rowData.forEach(griditem => {
          if (griditem.fileId == fileId) {
            griditem.bWillCreateVersion = will ? 'T' : 'F';
            griditem.bCanCreateVersion = can ? 'T' : 'F';
          }
        });
      });

      // Do Enables.
      //scope.doEnables();
      this.onSelectionChanged(null); // Rebuild Assign List too.
    });
  };

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
    let len = this.gridOptions.api.getSelectedRows().length;
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

}
