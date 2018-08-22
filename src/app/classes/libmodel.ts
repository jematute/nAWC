export class LibModel {
    public vaultId: string;
    public parentId: string;
    public libId: string;
    public name: string;
    public folder: string;
    public path: string;
    public bIsFolder: boolean;
    public comment1: string;
    public comment2: string;
    public comment3: string;
    public prCtrlId: string;
    public rtCtrlId: string;
    public wfCtrlId: string;
    public bIsHidden: boolean;
    public properties: LibraryPropertiesModel = null;
    public workflow: LibraryWorkflowModel = null;
    public children: Array<LibModel> = null;
    public icon: string;
}

export class LibraryPropertiesModel {
    public prCtrlId: string;
    public libId: string;
    public bAutoRev: boolean;
    public bChecking: boolean;
    public bDotRevs: boolean;
    public bFiltered: boolean;
    public bFTSOn: boolean;
    public bFTSRev: boolean;
    public bLaunch: boolean;
    public bVirtual: boolean;
    public bSupport: boolean;
    public dSpace: number;
    public hDepth: number;
    public revDepth: number;
}

export class LibraryWorkflowModel {
    public wfCtrlId: string;
    public wfId: string;
}