import { FileOperationModel, FileOperationPacket } from './file-operation-model';

export class PreCheckInItemObject {
    public fileId: string;
    public libId: string;
    public stagingFileOperationPacket: FileOperationPacket;
}
export class CheckInItemObject {
    public fileId: string;
    public libId: string;
    public assignToId: string;
    public undoCheckOut: boolean;
    public keepOut: boolean;
    public createVersion: boolean;
    public stagingFileOperationModel: FileOperationModel;
}