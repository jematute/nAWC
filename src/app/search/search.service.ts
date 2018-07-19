import { Injectable } from '@angular/core';
import { IGridInterface } from '../results/grid/grid-interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SearchParams, SearchTerm } from './search-params';
import { Global } from '../classes/global';
import { GetDataParams } from '../classes/getDataParams';
import { map, finalize, share, tap } from 'rxjs/operators';




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
    let count = params.CountOperation ? params.CountOperation : false;
    console.log("get data called countoperation:", count)
    let searchParams = params as SearchParams;
    searchParams.searchCriteria = this.searchCriteria;
    let results: GetDataParams;
    const req = this.http.post(`${Global.API_URL}/api/document/byfields`, JSON.stringify(params)).pipe(share())
    
    return req
    .pipe(map(d => results = d as GetDataParams ), map(s => s.AdeptDataTable));
    
  }

}
