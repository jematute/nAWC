import { Injectable, Output, EventEmitter } from '@angular/core';
import { IGridInterface } from './grid-interface';
import { GetDataParams, AdeptDataTable } from '../../classes/getDataParams';
import { Column } from '../../classes/column';
import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';

@Injectable()
export class GridService {

  public data: AdeptDataTable;

  public columns: Array<Column>;
  public dataService: IGridInterface;
  @Output() change: EventEmitter<any> = new EventEmitter();
  constructor() {

  }

  getData(params: GetDataParams): Observable<object> {
    return this.makeRequest(params);
  }

  getCount(params: GetDataParams) {
    params.CountOperation = true;
    return this.makeRequest(params);
  }

  makeRequest(params: GetDataParams): Observable<AdeptDataTable> {
    const obs = this.dataService.getData(params);
    obs.map(data => {
      this.data = data;
    });
    return obs;
  }

  reloadGrid() {
    this.change.emit("reload_data");
  }


}
