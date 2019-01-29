import { Observable } from 'rxjs';
import { ApiTypes } from './apitypes';

export interface ICommands {
    interfaceId: string;

    // when the button is clicked before the command has started
    beginCommand(event: CommandEvent): Observable<CommandEvent>;
    // when the command has started
    beginAction(event: CommandEvent): Observable<CommandEvent>;
    // before processing an item
    beginItem(event: CommandEvent): Observable<CommandEvent>;
    // when the command has completed fully
    endCommand(event: CommandEvent): Observable<CommandEvent>;
    // when all the items have finished but no necessarly the whole command i.e. send e-mail has not started
    endAction(event: CommandEvent): Observable<CommandEvent>;
    // when the item has finished processing
    endItem(event: CommandEvent): Observable<CommandEvent>;
}

export interface CommandEvent {
    command: ApiTypes.AdeptCommandNumber;
    action: EventAction;
    data: any;
    currentItem: any;
}

export enum EventAction {
    Continue,
    CancelOne,
    CancelAll,
}
