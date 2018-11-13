export class FieldDefinition {
    fieldName: string;
    displayName?: string;
    schemaID: string;
    fieldID: string;
    width: number;
    precision: number;
    bSystem: boolean;
    bProtected: boolean;
    bExtracted: boolean;
    bRestricted: boolean;
    bIndexed: boolean;
    fieldType: FieldType;
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