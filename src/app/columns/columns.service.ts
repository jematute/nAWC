import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FieldDefinition } from './fieldDefinition';
import { Global } from '../classes/global';
import { Observable } from 'rxjs';
import { ColumnSet } from './columnset';
import { mergeMap, map } from 'rxjs/operators';
import { Column } from '../classes/column';

@Injectable()
export class ColumnsService {

  columns: Array<FieldDefinition> = [];
  columnSets: Array<ColumnSet> = [];

  constructor(private http: HttpClient) {  }

  getColumns(): Observable<Array<FieldDefinition>> {
    const obs = this.http.get(`${Global.API_URL}/api/column/allavailable`).pipe(map(data => this.columns = data as Array<FieldDefinition>));
    return obs;
  }

  getColumnSets(): Observable<Array<ColumnSet>> {
    const obs = this.http.get(`${Global.API_URL}/api/columnset`).pipe(map(data => this.columnSets = data as Array<ColumnSet>));
    return obs;
  }

  getColumnSetColumns(columnSetId: string): Observable<Array<Column>> {
    let setColumns: Array<Column>;
    const obs = this.http.get(`${Global.API_URL}/api/column/${columnSetId}`).pipe(map(data => setColumns = data as Array<Column>));
    return obs;
  }

  getGridColumns(): Observable<Array<FieldDefinition>> {
    let columnSetColumns: Array<FieldDefinition>; 
    return this.getColumnSets().pipe(
      mergeMap(data => this.getColumnSetColumns(data.filter(d => d.name === "SearchResultColumns")[0].id).pipe(map(
        cols => this.lookUpFieldDefs(cols))
      ))
    )
  }

  lookUpFieldDefs(columns: Array<Column>): Array<FieldDefinition> {
    let fieldDefs: Array<FieldDefinition> = [];
    columns.forEach(col => fieldDefs.push(this.columns.find(f => f.schemaID == col.schemaId)));
    return fieldDefs;
  }


}
