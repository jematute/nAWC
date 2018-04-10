import { IGetDataParams, SortDirection, ResultType } from "../classes/getDataParams";
import { Column } from "../classes/column";

export class SearchParams implements IGetDataParams {

    skip: number;
    take: number;
    sortField: string;
    sortDirection: SortDirection;
    resultType?: ResultType;
    columns: Array<Column>
    searchCriteria: Array<SearchTerms>;
    countOperation: boolean;

    constructor() {
        
    }
}

export class SearchTerms {
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