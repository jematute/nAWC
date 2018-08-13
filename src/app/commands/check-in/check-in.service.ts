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
import { Observable } from 'rxjs';

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
    }))
  }

}
