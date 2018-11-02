import { SelectionItem } from './selectionitem';
import { ApiTypes } from './apitypes';

export class GridItem {
    index: number;
    selectionItem: SelectionItem;
    isSelected: boolean;
    fileId: string;
    name: string;
    library: string;
    status: string;
    opFlag: ApiTypes.OPFLAG;
    previousUTC: string;
    currentUTC: string;
    bKeepOut: string;
    bFileHasChanged: string;
    bDataCardHasChanged: string;
    bUndoCheckOut: string;
    bWillCreateVersion: string;
    bCanCreateVersion: string;
    bCreateVersion: string;
    assignToUserId: string;
    assignTo: string;
}