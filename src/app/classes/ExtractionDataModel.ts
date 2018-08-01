import { ExtendedRecordDataModel } from "./ExtendedRecordDataModel";
import { ExtractionComponent } from "./ExtractionComponent";
import { ExternalItemData } from "./ExternalItemData";

export class ExtractionDataModel {
    public AdeptFileId: string;
    public AdeptMajorRevision: number;
    public AdeptMinorRevision: number;
    public AdeptPathId: string;
    public BaseItemPath: string;
    public BaseItemUNCPath: string;
    public CadVersion: number;
    public ExtendedRecordCurrentItem: string;
    public ExtendedRecordData: Array<ExtendedRecordDataModel>;
    public MainRecordFieldValueSet: Map<string, string>;
    public ThumbNail: number[];
    public ThumbnailExtension: string;
    public FullTextSearchData: string;
    public ExtractionComponents: Array<ExtractionComponent>;
    public AdeptTableNumber: number;
    public MappedExtractionFields: Array<string>;
    public ExternalItems: Array<ExternalItemData>;
    public LastWriteTimeUTC: Date;
    public FailedPropertyExtraction: boolean;
    public FailedFtsExtraction: boolean;
    public ResolveType: any;
}