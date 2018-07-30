export class WorkAreaModel {
    public parentId: string;
    public workAreaId: string;
    public path: string;
    public label: string;
    public userId: string;
    public serial: string;
    public shared: string;
    public type: string;
    public support: string;
    public volume: string;
    public name: string;
    public validationState: ValidationState = ValidationState.Unchecked;
    public icon: string;
    public origName: string;
    public displayName: string;
}

export enum ValidationState {
    Unchecked,
    Valid,
    Invalid
}