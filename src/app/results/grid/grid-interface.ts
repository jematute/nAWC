import { GetDataParams } from "../../classes/getDataParams";
import { Observable } from "rxjs";
import { SearchParams } from "../../search/search-params";

export interface IGridInterface {
    getData(params: GetDataParams): Observable<SearchParams>;
    getCount(params: GetDataParams): Observable<number>;
}
