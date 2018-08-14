import { ApiTypes } from "./ApiTypes";

export class NtfItemXfer {
    public ntfItemXferType: NtfItemXferType = NtfItemXferType.Invalid;
    public adeptCommandCode: ApiTypes.AdeptCommandNumber;
    public fileNE: string;
    public tableNumber: ApiTypes.ADEPTT_TBL_NUM = ApiTypes.ADEPTT_TBL_NUM.C_INVALID;
    public fileId: string;
    public majRev: number = -1;
    public minRev: number = -1;
    public libId: string;
    public workflowId: string;
    public stepId: string;
    public originatorId: string;
    public userId: string;
    public extraInfo: string;
}

export enum NtfItemXferType {
    Invalid,

    Assign,

    Approve,

    FinalApprove
}
