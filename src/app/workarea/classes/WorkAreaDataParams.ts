import { GetDataParams, ResultType } from "../../classes/getdataparams";
import { Column } from "../../classes/column";
import { Sort } from "../../classes/sort";

export class WorkAreaDataParams implements GetDataParams {
    Sort: Sort;
    AdeptDataTable;
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

