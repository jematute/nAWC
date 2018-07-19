import { GetDataParams } from "../../classes/getDataParams";
import { Observable } from "rxjs";

export interface IGridInterface {
    getData(params: GetDataParams): Observable<any>;
}
