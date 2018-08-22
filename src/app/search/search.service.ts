import { Injectable } from '@angular/core';
import { IGridInterface } from '../results/grid/grid-interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SearchParams, SearchTerm } from './search-params';
import { Global } from '../classes/global';
import { GetDataParams, AdeptDataTable } from '../classes/getdataparams';
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

  getData(params: SearchParams): Observable<SearchParams> {
    let count = params.CountOperation ? params.CountOperation : false;
    //console.log("get data called countoperation:", count)
    let searchParams = params as SearchParams;
    if (this.searchCriteria && this.searchCriteria.length > 0)
      searchParams.searchCriteria = this.searchCriteria;
    else
      searchParams.searchCriteria = JSON.parse(localStorage.getItem("SearchCriteria")) as SearchTerm[];

    localStorage.setItem("SearchCriteria", JSON.stringify(searchParams.searchCriteria));
    
      let results: SearchParams;
    return this.http.post(`${Global.API_URL}/api/document/byfields`, JSON.stringify(params)).pipe(share(), map(d => results = d as SearchParams ));
    
  }

  getCount(params: SearchParams): Observable<number> {
    params.CountOperation = true;
    return this.getData(params).pipe(map(s => s.AdeptDataTable.RecordCount));
  }

  getName():string {
    return "SearchService";
  }

}
