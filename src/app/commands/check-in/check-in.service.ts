import { Injectable } from '@angular/core';
import { CommandService } from '../classes/commandservice';
import { MatDialog } from '@angular/material';
import { CheckInComponent } from './check-in.component';
import { SelectionItem } from '../../classes/selectionitem';
import { HttpClient } from '@angular/common/http';
import { Global } from '../../classes/global';
import { map } from 'rxjs/operators';
import { CheckInOptions } from '../../classes/checkinoptions';
import { FileInfoModel } from '../../classes/fileinfos';
import { ApiTypes } from '../../classes/ApiTypes';
import { SelectionListXfer } from '../../classes/selectionlist';
import { Observable, of } from 'rxjs';
import { GridItem } from './classes/grid-item';
import { AccessPathResult } from '../../classes/accesspathresult';
import { ErrorCode } from '../../classes/error-codes';
import { PreCheckInItemObject, CheckInItemObject } from '../../classes/checkinitem';
import { FileOperationPacket } from '../../classes/file-operation-model';
import { FileOperationModel } from '../../classes/fileoperation';
import { SelectionCommandResults } from '../../classes/selectioncommandresult';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  constructor(private http: HttpClient) { }

  getCheckInOptionsList(items: Array<SelectionItem>) {

    let options: Array<CheckInOptions> = new Array<CheckInOptions>();

    items.forEach(item => {
      let option = new CheckInOptions();
      option.fileId = item.fileId;
      option.libId = "";
      options.push(option);
    });

    return this.http.put(`${Global.API_URL}/api/SelectionCommand/CheckInOptionsList`, options).pipe(map(
      result => {
        return result as Array<CheckInOptions>;
      }
    ))
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
      return this.http.get(`${Global.API_URL}/api/Document/AccessPath/${selectionItem.tableNumber}/${selectionItem.fileId}/${selectionItem.majRev}/${selectionItem.minRev}`)
      .pipe(map(resp => resp as AccessPathResult));
    }
    else {
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

  processFileOperation(fileOperation: FileOperationPacket): Observable<FileOperationModel> {
    return this.http.put(`${Global.ACS_URL}/api/processFileOperationPacket`, fileOperation)
      .pipe(map(resp => resp as FileOperationModel));
  }

  // Call the command with a Selection List.
  checkInItem(gridItem: GridItem, stagingFileOperationModel: FileOperationModel): Observable<SelectionCommandResults> {
    let checkInItemObject: CheckInItemObject = {
      fileId: gridItem.fileId,
      libId: gridItem.selectionItem.detailedInfo.libId,
      assignToId: gridItem.assignToUserId,
      undoCheckOut: gridItem.bUndoCheckOut == "T" ? true : false,
      keepOut: gridItem.bKeepOut == "T" ? true : false,
      createVersion: gridItem.bCreateVersion == "T" ? true : false,
      stagingFileOperationModel: stagingFileOperationModel,
    }

    return this.http.put(`${Global.API_URL}/api/selectioncommand/checkinitem`, checkInItemObject)
      .pipe(map(resp => resp as SelectionCommandResults));
  }








}
