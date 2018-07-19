import { Injectable, Output, EventEmitter } from '@angular/core';
import { IGridInterface } from './grid-interface';
import { GetDataParams, AdeptDataTable } from '../../classes/getDataParams';
import { Column } from '../../classes/column';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable()
export class GridService {

  public data: AdeptDataTable;
  public length: number = 0;
  public pageSize: number = 100;
  public pageIndex: number;
  public columns: Array<Column>;
  public dataService: IGridInterface;
  @Output() change: EventEmitter<any> = new EventEmitter();
  public loading: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router) {
    this.data = new AdeptDataTable();
  }

  getData(params: GetDataParams): Observable<object> {
    return this.makeRequest(params).pipe(finalize(() => {
      this.loading.emit(false);
    }));
  }

  getCount(params: GetDataParams) {
    params.CountOperation = true;
    return this.makeRequest(params);
  }

  makeRequest(params: GetDataParams): Observable<AdeptDataTable> {
    this.loading.emit(true);
    const obs = this.dataService.getData(params);
    obs.subscribe(data => {
      this.data = data;
      if (params.CountOperation)
        this.length = data.RecordCount;
    });
    return obs;
  }

  reloadGrid() {
    this.router.navigate(["layout/results"]).then(() => {
      this.change.emit("reload_data");
    });
  }


}
