export class ExtendedRecordDataModel {
    public itemName: string = "";
    public isDefault: boolean = false;
    public flagForGlif: boolean = false;
    public status: string = "";
    public linkageType: string = "";
    public itemsFieldValuePairs: Map<string, string> = new Map<string, string>();
}