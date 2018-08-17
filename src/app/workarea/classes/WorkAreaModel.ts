import { ApiTypes } from "../../classes/ApiTypes";
import { PlugInDefinition } from "../../classes/plugIndefinition";

export class WorkAreaModel {
    public parentId: string;
    public workAreaId: string;
    public path: string;
    public label: string;
    public userId: string;
    public serial: string;
    public shared: string;
    public type: string;
    public support: string;
    public volume: string;
    public name: string;
    public validationState: ValidationState = ValidationState.Unchecked;
    public icon: string;
    public origName: string;
    public displayName: string;
    public pathExists: string;
}

export enum ValidationState {
    Unchecked,
    Valid,
    Invalid
}

export class WorkAreaItemsList {
    public pathExists: boolean;
    private _workAreaId: string;
    public get WorkAreaId(): string {
        return this._workAreaId;
    }
    public set WorkAreaId(value: string) {
        this._workAreaId = value;
    }
    public Path: string;
    public items: Array<WorkAreaClientFileModel> = new Array<WorkAreaClientFileModel>();
}
export class WorkAreaClientFileModel {
    public Name: string;
    private _lastWriteTime: Date;
    public get LastWriteTime(): Date {
        return this._lastWriteTime;
    }
    public set LastWriteTime(value: Date) {
        this._lastWriteTime = value;
    }
    private _fileByteSize: number;
    public get FileByteSize(): number {
        return this._fileByteSize;
    }
    public set FileByteSize(value: number) {
        this._fileByteSize = value;
    }
}
export class WorkAreaExtractionItems {
    private _workAreaId: string;
    public get WorkAreaId(): string {
        return this._workAreaId;
    }
    public set WorkAreaId(value: string) {
        this._workAreaId = value;
    }
    public Path: string;
    public items: Array<WorkAreaDBRecordModel> = new Array<WorkAreaDBRecordModel>();
    public invalidItems: Array<WorkAreaInvalidFile> = new Array<WorkAreaInvalidFile>();
}
export class WorkAreaDBRecordModel {
    public Name: string;
    public get FileId(): string {
        return this._fileId;
    }
    public set FileId(value: string) {
        this._fileId = value;
    }
    private _fileId: string;
    public get MajorRevision(): number {
        return this._majorRevision;
    }
    public set MajorRevision(value: number) {
        this._majorRevision = value;
    }
    private _majorRevision: number;
    public get MinorRevision(): number {
        return this._minorRevision;
    }
    public set MinorRevision(value: number) {
        this._minorRevision = value;
    }
    private _minorRevision: number;
    public get OpFlag(): any {
        return this._opFlag;
    }
    public set OpFlag(value: any) {
        this._opFlag = value;
    }
    private _opFlag: any;
    public extractText: boolean;
}
export class WorkAreaInvalidFile {
    public Name: string;
    public Reason: InvalidCode;
}
export enum InvalidCode {
    eValid = 0,

    eStringTooLong,

    eStringContainsInvalidChar
}

export class IncomingWillExtract {
    public PluginDefinitions: Array<PlugInDefinition>;
    public Items: Array<WorkAreaDBRecordModel>;
}