import { ApiTypes } from "./apitypes";
import { SelectionItem } from "./selectionitem";

export class SelectionListXfer {
    public mode: ApiTypes.SELECTION_LIST_MODE = ApiTypes.SELECTION_LIST_MODE.SL_WIP;
    public order: ApiTypes.SELECTION_LIST_ORDER = ApiTypes.SELECTION_LIST_ORDER.SL_FILENAME;
    public list: Array<SelectionItem> = new Array<SelectionItem>();
}

