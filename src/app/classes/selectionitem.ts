import { ApiTypes } from "./ApiTypes";
import { FileOperationModel } from "./file-operation-model";
import { ErrorCode } from "./error-codes";
import { UIEnable } from "./uirightsandenables";

export class SelectionItem {
    public docId: string = null;
    public filename: string = "";
    public sortval: string = "";
    public tableNumber: ApiTypes.ADEPTT_TBL_NUM = ApiTypes.ADEPTT_TBL_NUM.C_FILES;
    public fileId: string = "";
    public majRev: number = -1;
    public minRev: number = -1;
    public commandParams: CommandParams = null;
    public detailedInfo: DetailedInfo = null;
}

export enum UpdateMode {
    none,
    update,
    remove,
    replace,
    add
}

export class CommandParams {
    public eWorkflowComment: string;
    public ebMakeRevision: boolean;
    public eNewName: string;
    public eLibId: string;
    public eAssignToUserId: string;
    public eWorkAreaId: string;
    public eFileTypeId: string;
    public eWorkflowId: string;
    public eStepId: string;
    public ebKeepOut: boolean;
    public ebUndoSignOut: boolean;
    public ebFileHasChanged: boolean;
    public ebMakePermanent: boolean;
    public ebIsTransmittal: boolean;
    public eStagingFileOperationModel: FileOperationModel;
    public ebCopyDataCard: boolean;
    public ebSupercede: boolean;
    public eSupercedeFileId: string;
    public eExtractText: boolean;
    public eMajRev: number;
    public eMinRev: number;
    public ebUndoCheckOut: boolean;
}
export class DetailedInfo {
    public filename: string;
    public bGRev: boolean;
    public opFlag: ApiTypes.OPFLAG;
    public status: string;
    public libId: string;
    public userId: string;
    public lastUserId: string;
    public targetId: string;
    public workflowId: string;
    public workflowStepId: string;
    public defaultWorkflowId: string;
    public originatorId: string;
    public fileUtc: string;
    public fileSize: number;
    public linkType: ApiTypes.ADLINKTYPE;
    public bIsParent: boolean;
    public bIsChild: boolean;
    public libName: string;
    public activeWorkflowName: string;
    public activeStepName: string;
    public menuEnables: Map<string, UIEnable>;
}