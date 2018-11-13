import { LibModel } from "./libmodel";

export enum VaultType {
    VAULT_FTPDISABLED,

    VAULT_FORCEFTP,

    VAULT_ALLOWREAD,

    VAULT_ALLOWREADWRITE,

    VAULT_ADEPT_FILE_SYSTEM
}
export enum FtpCompression {
    VAULT_FTP_COMPRESSION_MIN = 0,

    VAULT_FTP_COMPRESSION_AUTO = 0,

    VAULT_FTP_COMPRESSION_ALWAYS,

    VAULT_FTP_COMPRESSION_NEVER,

    VAULT_FTP_COMPRESSION_MAX = VAULT_FTP_COMPRESSION_NEVER
}
export enum FtpConnectionType {
    VAULT_FTPSTD,

    VAULT_FTPSECURE,

    VAULT_FTPMAX
}

export class VaultModel {
    static defaultVaultType: VaultType = VaultType.VAULT_ADEPT_FILE_SYSTEM;
    static defaultFtpPort: number = 21;
    static defaultFtpCompression: FtpCompression = FtpCompression.VAULT_FTP_COMPRESSION_AUTO;
    static VAULT_FTP_COMPRESSION_THRESHOLD_DEFAULT: number = 500;
    public id: string;
    public name: string;
    public vaultType: VaultType;
    public desc: string;
    public fileServer: string;
    public shareName: string;
    public ftpHost: string;
    public ftpUser: string;
    public ftpPassword: string;
    public ftpPort: number;
    public ftpCompression: FtpCompression;
    public ftpCompressionOnAtMillisec: number;
    public ftpConnectionType: FtpConnectionType;
    public bFtpFirewall: boolean;
    public afsServer: string;
    public afsPort: number;
    public children: Array<LibModel>;
    public icon: string;
    constructor() {
        this.vaultType = VaultModel.defaultVaultType;
        this.ftpPort = VaultModel.defaultFtpPort;
        this.ftpCompression = VaultModel.defaultFtpCompression;
        this.ftpCompressionOnAtMillisec = VaultModel.VAULT_FTP_COMPRESSION_THRESHOLD_DEFAULT;
        this.children = null;
    }
}
