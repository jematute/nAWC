export class FileRecord {
    SCHEMA_S_FILEID: string;
    SCHEMA_S_MINREV: number;
    SCHEMA_S_MAJREV: number;
    SCHEMA_S_CHILD: string;
    SCHEMA_S_CHKBYID: string;
    SCHEMA_S_EXT: string;
    SCHEMA_S_EXTRACT: string;
    SCHEMA_S_FILESIZE: number;
    SCHEMA_S_FLTPID: string;
    SCHEMA_S_GREV: string;
    SCHEMA_S_LIBNAME: string;
    SCHEMA_S_HASER: string;
    SCHEMA_S_HDEPTH: number;
    SCHEMA_S_INONCE: string;
    SCHEMA_S_LIBID: string;
    SCHEMA_S_LINKED: string;
    SCHEMA_S_LOCKBYID: string;
    SCHEMA_S_LONGNAME: string;
    SCHEMA_S_LSTOWNID: string;
    SCHEMA_S_MEMOTYPE: string;
    SCHEMA_S_OPFLAG: string;
    SCHEMA_S_PARENT: string;
    SCHEMA_S_PATHID: string;
    SCHEMA_S_RDL: string;
    SCHEMA_S_SRCDB: number;
    SCHEMA_S_STATUS: string;
    SCHEMA_S_STEPID: string;
    SCHEMA_S_TAPEID: string;
    SCHEMA_S_USERID: string;
    SCHEMA_S_VERIFIED: string;
    SCHEMA_S_WFID: string;
    SCHEMA_S_DEFWFID: string;
    SCHEMA_S_ORIGID: string;
    SCHEMA_S_FILEUTC: string;
    SCHEMA_S_EXTRUTC: string;
    SCHEMA_S_APPRUTC: string;
    SCHEMA_S_ADEPTUTC: string;
    SCHEMA_S_ADDEDUTC: string;
    SCHEMA_S_VAULTID: string;
    SCHEMA_S_MISMATCH: string;
    SCHEMA_S_WFNAME: string;
    SCHEMA_S_STEPNAME: string;
}

export class FileKeys {
    constructor(record: FileRecord) {
        this.fileId = record.SCHEMA_S_FILEID;
        this.majRev = record.SCHEMA_S_MAJREV;
        this.minRev = record.SCHEMA_S_MINREV;
    }
    fileId: string;
    majRev: number;
    minRev: number;
}