import { GetDataParams, SortDirection, ResultType, AdeptDataTable } from "../classes/getDataParams";
import { Column } from "../classes/column";

export class SearchParams implements GetDataParams {
    AdeptDataTable: AdeptDataTable;
    Sort: string;
    SortDirection: SortDirection;
    ResultType?: ResultType;
    Columns: Array<Column>
    searchCriteria: Array<SearchTerm>;
    CountOperation: boolean;

    constructor() {
        
    }
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
    public ftsSearchId: boolean;
    public safCardId: string;
} 