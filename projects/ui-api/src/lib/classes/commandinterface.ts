import { Observable } from "rxjs";
import { ApiTypes } from "./apitypes";

export interface ICommands {
    interfaceId: string;

    beginCommand(event: CommandEvent): Observable<CommandEvent>;
    beginAction(event: CommandEvent): Observable<CommandEvent>;
    beginItem(event: CommandEvent): Observable<CommandEvent>;
}

export interface CommandEvent {
    command: ApiTypes.AdeptCommandNumber;
    action: EventAction;
}

export enum EventAction {
    Continue,
    CancelOne,
    CancelAll
}
  