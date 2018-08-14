import { ApiTypes } from "./ApiTypes";
import { ErrorCode } from "./error-codes";

export class AccessPathResult {
    public ec: ErrorCode;
    public bFileWasDownloaded: boolean;
    public libraryId: string;
    public fileNE: string;
    public accessPNE: string;
    public fileId: string;
    public majorRevision: number;
    public minorRevision: number;
    public tableNumber: ApiTypes.ADEPTT_TBL_NUM;
}