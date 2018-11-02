import { GetDataParams, SortDirection, ResultType, AdeptDataTable } from './getdataparams';
import { Column } from '../classes/column';
import { UIEnable } from '../classes/uirightsandenables';
import { Sort } from '../classes/sort';

export class SearchParams implements GetDataParams {
    AdeptDataTable: AdeptDataTable;
    Sort: Sort;
    ResultType?: ResultType = ResultType.Normal;
    Columns: Array<Column>;
    searchCriteria: Array<SearchTerm>;
    CountOperation: boolean;
    SaveLastSearch = true;
    ColumnSetId: string;
    MenuEnables: Map<string, UIEnable> = new Map<string, UIEnable>();
    MultiOperation: boolean;
}

export class SearchTerm {
    public schemaID: string;
    public valueStr: string;
    public startDate: string;
    public endDate: string;
    public searchOp: string;
    public isDecimal: boolean;
    public isNot: boolean;
    public isAnd: boolean;
    public ftsSearchId: string;
    public safCardId: string;
}
