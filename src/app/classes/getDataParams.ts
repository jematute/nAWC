import { Column } from "./column";

export interface IGetDataParams {
    skip: number;
    take: number;
    sortField: string;
    sortDirection: SortDirection;
    resultType?: ResultType;
    columns: Array<Column>;
    countOperation: boolean;
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