import { GetDataParams } from "../../classes/getDataParams";
import { Observable } from "rxjs/Observable";

export interface IGridInterface {
    getData(params: GetDataParams): Observable<any>;
}
