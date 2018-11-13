export class ExtractionComponent {
    private _extractionComponentType: ComponentType;
    public get ExtractionComponentType(): ComponentType {
        return this._extractionComponentType;
    }
    public set ExtractionComponentType(value: ComponentType) {
        this._extractionComponentType = value;
    }
}

export enum ComponentType {
    Main_Rec = 0,

    FullTextSearch,

    Thumbnail,

    ExternalReferences,

    ExtendedRecords,

    ExtractionState
}