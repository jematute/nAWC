import { Injectable } from '@angular/core';
import { IGridInterface } from '../results/grid/grid-interface';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { SearchParams } from './search-params';

@Injectable()
export class SearchService implements IGridInterface {

  constructor(private http: HttpClient) { }

  getData(params: SearchParams): Observable<Object> {
    return this.http.post(``, JSON.stringify(params));
  }

  getCount(params: SearchParams) {
    params.countOperation = true;
    return this.http.post(``, JSON.stringify(params));
  }

}
