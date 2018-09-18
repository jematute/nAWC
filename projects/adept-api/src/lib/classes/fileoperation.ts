import { ErrorCode } from './error-codes';
import { VaultModel } from './vaultmodel';

export class FileOperationPacket {
    public fileOperations: Array<FileOperationModel> = new Array<FileOperationModel>();
    public vaults: Array<VaultModel> = new Array<VaultModel>();
}

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