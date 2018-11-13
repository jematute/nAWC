import { Column } from './column';
import { Sort } from './sort';

export interface GetDataParams {
    AdeptDataTable: AdeptDataTable;
    Sort: Sort;
    ResultType?: ResultType;
    Columns: Array<Column>;
    CountOperation: boolean;
}

export class AdeptDataTable {
    Skip: number;
    Take: number;
    RecordCount: number;
    TableRecords: Array<any>;
}

export enum SortDirection {
    Ascending = 0,
    Descending = 1,
}

export enum ResultType {
    Normal = 0,
    CSV = 1,
    Excel = 2,
}
