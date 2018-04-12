import { Injectable } from '@angular/core';
import { IGridInterface } from '../results/grid/grid-interface';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { SearchParams, SearchTerm } from './search-params';
import { Global } from '../classes/global';
import { GetDataParams } from '../classes/getDataParams';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/finally';

@Injectable()
export class SearchService implements IGridInterface {

  public searchCriteria: Array<SearchTerm> = [];

  constructor(private http: HttpClient) { }

  setSearchCriteria(schemaId: string, searchValue: string) {
    let term: SearchTerm = new SearchTerm();
    term.schemaID = schemaId;
    term.valueStr = searchValue;
    this.searchCriteria = [ term ];
  }

  getData(params: GetDataParams): Observable<any> {
    let searchParams = params as SearchParams;
    searchParams.searchCriteria = this.searchCriteria;
    console.log("Search criteria:", this.searchCriteria);
    const req = this.http.post(`${Global.API_URL}/api/document/byfields`, JSON.stringify(params));
    let results: GetDataParams;
    return req.map(d => results = d as GetDataParams ).map(s => s.AdeptDataTable).finally(() => {
      //do something after it's done.
    });
  }

}
