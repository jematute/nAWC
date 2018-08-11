import { ErrorCode } from "./error-codes";

export class FileOperationModel {
    public fileOperationAction: FileOperationAction;
    public sourceFileOperationType: FileOperationType;
    public sourceVaultId: string;
    public sourceFile: string;
    public sourceDateTime: Date;
    public sourceFileSize: number;
    public destinationFileOperationType: FileOperationType;
    public destinationVaultId: string;
    public destinationFile: string;
    public afsServerId: string;
    public finalDestinationPath: string;
    public ec: ErrorCode;
}


export enum FileOperationAction {
    eInvalid,

    eCopy,

    eMove,

    eCopyOnMismatch,

    eDelete,

    eDirectoryCheck,

    eFileCheck
}

export enum FileOperationType {
    eInvalid,

    eLocal,

    eURL,

    eVault
}