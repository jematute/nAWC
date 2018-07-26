import { Injectable } from '@angular/core';
import { IGridInterface } from '../results/grid/grid-interface';
import { GetDataParams } from '../classes/getDataParams';
import { Observable } from '../../../node_modules/rxjs';
import { SearchParams, SearchTerm } from './search-params';
import { map, share } from '../../../node_modules/rxjs/operators';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { Global } from '../classes/global';

@Injectable({
  providedIn: 'root'
})
export class FTSSearchService implements IGridInterface {

  constructor(private http: HttpClient) { }

  public searchCriteria: Array<SearchTerm> = [];

  setSearchCriteria(schemaId: string, searchValue: string) {
    let term: SearchTerm = new SearchTerm();
    term.schemaID = schemaId;
    term.valueStr = searchValue;
    this.searchCriteria = [ term ];
  }

  getData(params: GetDataParams): Observable<any> {
    let count = params.CountOperation ? params.CountOperation : false;
    let searchParams = params as SearchParams;
    searchParams.searchCriteria = this.searchCriteria;
    let results: GetDataParams;
    const req = this.http.post(`${Global.API_URL}/api/document/fulltextsearch/`, JSON.stringify(params)).pipe(share());
    
    return req
    .pipe(map(d => results = d as GetDataParams ), map(s => s.AdeptDataTable));
    
  }

}
