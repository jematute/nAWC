export class UIOperation {
    constructor(enabled: boolean, reason: string) {
        this.enabled = enabled;
        this.reason = reason;
    }
    public enabled = false;
    public reason: string = null;
}
export class UIEnable {
    public viewCard: UIOperation = new UIOperation(false, null);
    public viewFile: UIOperation = new UIOperation(false, null);
    public viewLocal: UIOperation = new UIOperation(false, null);
    public viewPdf: UIOperation = new UIOperation(false, null);
    public download: UIOperation = new UIOperation(false, null);
    public assign: UIOperation = new UIOperation(false, null);
    public unAssign: UIOperation = new UIOperation(false, null);
    public expediteReject: UIOperation = new UIOperation(false, null);
    public rejectTo: UIOperation = new UIOperation(false, null);
    public reject: UIOperation = new UIOperation(false, null);
    public approve: UIOperation = new UIOperation(false, null);
    public expediteApprove: UIOperation = new UIOperation(false, null);
    public reroute: UIOperation = new UIOperation(false, null);
    public setWorkflow: UIOperation = new UIOperation(false, null);
    public createVersion: UIOperation = new UIOperation(false, null);
    public copyToCurrent: UIOperation = new UIOperation(false, null);
    public finalApprove: UIOperation = new UIOperation(false, null);
    public restartWorkflow: UIOperation = new UIOperation(false, null);
    public editManualRelationships: UIOperation = new UIOperation(false, null);
    public setDocWorkflow: UIOperation = new UIOperation(false, null);
    public checkout: UIOperation = new UIOperation(false, null);
    public checkin: UIOperation = new UIOperation(false, null);
    public sendTo: UIOperation = new UIOperation(false, null);
    public releasecheckout: UIOperation = new UIOperation(false, null);
    public acquirecheckout: UIOperation = new UIOperation(false, null);
    public deletedoc: UIOperation = new UIOperation(false, null);
    public undocheckoutofunchangedchildren: UIOperation = new UIOperation(false, null);
    public copy: UIOperation = new UIOperation(false, null);
    public rename: UIOperation = new UIOperation(false, null);
    public refreshvl: UIOperation = new UIOperation(false, null);
    public selectiontree: UIOperation = new UIOperation(false, null);
    public refreshextracteddata: UIOperation = new UIOperation(false, null);
    public clearextracteddata: UIOperation = new UIOperation(false, null);
    public openforedit: UIOperation = new UIOperation(false, null);
    public userIsWorkflowManager: UIOperation = new UIOperation(false, null);
    public deleteRedline: UIOperation = new UIOperation(false, null);
    public copyUrl: UIOperation = new UIOperation(false, null);
    public searchForChildren: UIOperation = new UIOperation(false, null);
}
