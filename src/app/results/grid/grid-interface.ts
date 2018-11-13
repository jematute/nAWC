import { GetDataParams } from "../../classes/getdataparams";
import { Observable } from "rxjs";
import { SearchParams } from "../../search/search-params";

export interface IGridInterface {
    getData(params: GetDataParams): Observable<SearchParams>;
    getCount(params: GetDataParams): Observable<number>;
    getName(): string;
}
