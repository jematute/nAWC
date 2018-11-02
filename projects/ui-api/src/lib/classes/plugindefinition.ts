export class PlugInDefinition {
    public pluginId: string;
    public pluginName: string;
    public interfaceName: string;
    public localPath: string;
    public loadOnStartUp: boolean;
    public loadOrder: number;
    public isRequired: boolean;
    public description: string;
    public userCharacter1: string;
    public userCharacter2: string;
    public userCharacter3: string;
    public userNumeric1: number;
    public userNumeric2: number;
    public userNumeric3: number;
    public userMemo1: number[];
    public userMemo2: number[];
    public userMemo3: number[];
}