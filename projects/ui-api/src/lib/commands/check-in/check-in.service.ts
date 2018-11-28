import { Injectable, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { SelectionItem } from '../../classes/selectionitem';
import { CheckInOptions } from '../../classes/checkinoptions';
import { Global } from '../../classes/global';
import { FileInfoModel } from '../../classes/fileinfos';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionListXfer } from '../../classes/selectionlist';
import { AccessPathResult } from '../../classes/accesspathresult';
import { ErrorCode } from '../../classes/error-codes';
import { PreCheckInItemObject, CheckInItemObject } from '../../classes/checkinitem';
import { FileOperationPacket, FileOperationModel } from '../../classes/file-operation-model';
import { GridItem } from '../../classes/grid-item';
import { SelectionCommandResults } from '../../classes/selectioncommandresult';
import { ApiTypes } from '../../classes/apitypes';


@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  dialog: MatDialog;
  constructor(private http: HttpClient) { }

  onCheckingStarted = new EventEmitter<any>();

  getCheckInOptionsList(items: Array<SelectionItem>) {

    const options: Array<CheckInOptions> = new Array<CheckInOptions>();

    items.forEach(item => {
      const option = new CheckInOptions();
      option.fileId = item.fileId;
      option.libId = '';
      options.push(option);
    });

    return this.http.put(`${Global.API_URL}/api/SelectionCommand/CheckInOptionsList`, options).pipe(map(
      result => {
        return result as Array<CheckInOptions>;
      }
    ));
  }

  getFileInfos(filesInfos: Array<FileInfoModel>) {
    return this.http.put(`${Global.ACS_URL}/api/fileInfos`, filesInfos).pipe(map(resp => {
      return resp as Array<FileInfoModel>;
    }));
  }

  getAllowUndoCheckOut(list): Observable<boolean> {
    return this.http.put(`${Global.API_URL}/api/SelectionCommand/AllowUndoCheckOut`, list)
      .pipe(map(resp => resp as boolean));
  }

  getUserListForAssign(commandNumber: ApiTypes.AdeptCommandNumber, list: SelectionListXfer): Observable<Map<string, string>> {
    return this.http.put(`${Global.API_URL}/api/selectioncommand/UserListForAssign/${commandNumber}`, list)
      .pipe(map(resp => {
        return resp as Map<string, string>;
      }));
  }

  getAccessPath(selectionItem: SelectionItem): Observable<AccessPathResult> {
    const opFlagArr = [ApiTypes.OPFLAG.O_OUT, ApiTypes.OPFLAG.O_NEW, ApiTypes.OPFLAG.O_DUP];
    if (opFlagArr.includes(selectionItem.detailedInfo.opFlag)) {
      // tslint:disable-next-line:max-line-length
      return this.http.get(`${Global.API_URL}/api/Document/AccessPath/${selectionItem.tableNumber}/${selectionItem.fileId}/${selectionItem.majRev}/${selectionItem.minRev}`)
      .pipe(map(resp => resp as AccessPathResult));
    } else {
      return of(null);
    }
  }

  testAccess(accessPath: AccessPathResult): Observable<boolean> {
    return this.http.put(`${Global.ACS_URL}/api/testaccess`, accessPath.accessPNE)
    .pipe(map(s => s as boolean));
  }

  errorCode(selectionItem: SelectionItem, ec: ErrorCode): Observable<SelectionItem> {
    return this.http.put(`${Global.API_URL}/api/SelectionCommand/ErrorCode/${ec}`, selectionItem)
      .pipe(map(resp => selectionItem));
  }

  preCheckInItem(preCheckInItemObject: PreCheckInItemObject): Observable<PreCheckInItemObject> {
    return this.http.put(`${Global.API_URL}/api/selectioncommand/precheckinitem`, preCheckInItemObject)
      .pipe(map(resp => resp as PreCheckInItemObject));
  }

  processFileOperation(fileOperation: FileOperationPacket): Observable<FileOperationPacket> {
    return this.http.put(`${Global.ACS_URL}/api/processFileOperationPacket`, fileOperation)
      .pipe(map(resp => resp as FileOperationPacket));
  }

  // Call the command with a Selection List.
  checkInItem(gridItem: GridItem, stagingFileOperationModel: FileOperationModel): Observable<SelectionCommandResults> {
    this.onCheckingStarted.emit();

    const checkInItemObject: CheckInItemObject = {
      fileId: gridItem.fileId,
      libId: gridItem.selectionItem.detailedInfo.libId,
      assignToId: gridItem.assignToUserId,
      undoCheckOut: gridItem.bUndoCheckOut === 'T' ? true : false,
      keepOut: gridItem.bKeepOut === 'T' ? true : false,
      createVersion: gridItem.bCreateVersion === 'T' ? true : false,
      stagingFileOperationModel: stagingFileOperationModel,
    };

    return this.http.put(`${Global.API_URL}/api/selectioncommand/checkinitem`, checkInItemObject)
      .pipe(map(resp => resp as SelectionCommandResults));
  }
}
