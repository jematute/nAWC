import { Injectable } from '@angular/core';
import { IGridInterface } from '../results/grid/grid-interface';
import { GetDataParams, AdeptDataTable } from '../classes/getdataparams';
import { Observable, BehaviorSubject, throwError as observableThrowError } from 'rxjs';
import { SearchParams, SearchTerm } from './search-params';
import { map, share, tap, catchError, take, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Global } from '../classes/global';

@Injectable({
  providedIn: 'root'
})
export class FTSSearchService implements IGridInterface {

  constructor(private http: HttpClient) { }

  public searchCriteria: Array<SearchTerm> = [];
  public countSubject: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  private ftsSearchId = "";

  setSearchCriteria(searchValue: string) {
    let term: SearchTerm = new SearchTerm();
    term.valueStr = searchValue;
    this.ftsSearchId = "";
    this.searchCriteria = [term];
  }

  getData(params: GetDataParams): Observable<any> {
    this.searchCriteria[0].ftsSearchId = this.ftsSearchId;
    let count = params.CountOperation ? params.CountOperation : false;
    this.countSubject.next(null);
    let searchParams = params as SearchParams;
    if (this.searchCriteria && this.searchCriteria.length > 0)
      searchParams.searchCriteria = this.searchCriteria;
    else
      searchParams.searchCriteria = JSON.parse(localStorage.getItem("SearchCriteria")) as SearchTerm[];

    localStorage.setItem("SearchCriteria", JSON.stringify(searchParams.searchCriteria));
    let results: GetDataParams;
    return this.http.post(`${Global.API_URL}/api/document/fulltextsearch/`, JSON.stringify(params)).pipe(share())
      .pipe(tap(raw => {
        let seachCriteria = raw["SearchCriteria"] as Array<SearchTerm>;
        if (seachCriteria.length > 0)
          this.ftsSearchId = seachCriteria[0].ftsSearchId;
      })
        , map(d => results = d as GetDataParams)
        , map(s => s.AdeptDataTable), tap(table => {
          this.countSubject.next(table.RecordCount);
        }), catchError(err => {
          this.countSubject.next(0);
          return observableThrowError(err);
        }));

  }

  getCount(params: GetDataParams): Observable<number> {
    console.log("getCount");
    return this.countSubject.pipe(tap(count => {
      console.log("");
    }));
  }

  getName(): string {
    return "FTSService";
  }


}
