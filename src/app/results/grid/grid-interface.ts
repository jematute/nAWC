import { IGetDataParams } from "../../classes/getDataParams";

export interface IGridInterface {
    getData(params: IGetDataParams);
    getCount(params: IGetDataParams);
}
