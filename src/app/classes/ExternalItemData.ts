import { ApiTypes } from './apitypes'

export class ExternalItemData {
    public itemType: ItemType;
    public itemSubType: ApiTypes.XRSUBTYPE;
    public setSubType: boolean;
    public name: string;
    public pathSavedInParent: string;
    public pathSavedInParentUNC: string;
    public count: number;
    public configurations: Array<ConfigurationModel>;
}
export module ExternalItemData {
    export enum ItemType {
        dwg_linkage,

        manual_linkage,

        printrequest_linkage,

        transmittal_linkage,

        api_linkage
    }
}

export class ConfigurationModel {
    public ParentConfigurationName: string;
    public ChildConfigurationItems: Array<ChildConfiguration>;
}

export class ChildConfiguration {
    public childConfigurationName: string;
    public configurationCount: number;
    constructor(configurationName: string, count: number) {
        this.childConfigurationName = configurationName;
        this.configurationCount = count;
    }
}

export enum ItemType {
    dwg_linkage,

    manual_linkage,

    printrequest_linkage,

    transmittal_linkage,

    api_linkage
}