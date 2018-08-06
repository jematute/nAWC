import { Observable } from "rxjs";
import { EventEmitter } from "@angular/core";

export class MessageData {
    title: string;
    message: string;
    onDataUpdate: EventEmitter<any> = new EventEmitter<any>();
}