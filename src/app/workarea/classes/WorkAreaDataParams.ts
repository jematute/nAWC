import { GetDataParams, SortDirection, ResultType } from "../../classes/getdataparams";
import { Column } from "../../classes/column";

export class WorkAreaDataParams implements GetDataParams {
    AdeptDataTable;    Sort: string;
    SortDirection: SortDirection;
    ResultType?: ResultType;
    Columns;
    CountOperation: boolean;
    WorkAreaId: string;
}

export class WorkAreaDataRequestModel {
    public WorkAreaId: string;
    public Path: string;
    public Columns: Array<Column>;
    public ColumnSetId: string;
    public Values: Array<string>;
    public Sort: string;
    public Skip: number;
    public Take: number;
    public ResultType: ResultType = ResultType.Normal;
}

