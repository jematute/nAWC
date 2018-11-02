import { ErrorCode } from './error-codes';
import { SelectionListXfer } from './selectionlist';
import { FileOperationPacket } from './file-operation-model';
import { NtfItemXfer } from './ntfitemxfertype';
import { EmailItem } from './emailitem';

export class SelectionCommandResults {
    public ec: ErrorCode;
    public slx: SelectionListXfer;
    public ntfItemXfers: Array<NtfItemXfer>;
    public emails: Array<EmailItem>;
    public fileOperationPacket: FileOperationPacket;
    public generalOperationResultObject: Object;
}
