import { GetDataParams } from './getdataparams';
import { Observable } from 'rxjs';
import { SearchParams } from './search-params';


export interface IGridInterface {
    getData(params: GetDataParams): Observable<SearchParams>;
    getCount(params: GetDataParams): Observable<number>;
    getName(): string;
}
