export class FieldDefinition {
    public fieldName: string;
    public displayName: string;
    public schemaID: string;
    public fieldID: string;
    public width: number;
    public precision: number;
    public bSystem: boolean;
    public bProtected: boolean;
    public bExtracted: boolean;
    public bRestricted: boolean;
    public bIndexed: boolean;
    public fieldType: FieldType;
}

enum FieldType {
    FDT_UNKNOWN = -1,
    FDT_CHARACTER,
    FDT_STRING,
    FDT_LOGICAL,
    FDT_INTEGER,
    FDT_DOUBLE,
    FDT_DATE,
    FDT_MEMO,
    FDT_DT_DATETIME,
    FDT_INT64
}