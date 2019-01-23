import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';
import { ToolbarService } from '../toolbar/toolbar.service';
import { EventEmitter } from '@angular/core';
import { CommandEvent } from './commandinterface';
import { ApiTypes } from './apitypes';

export class ToolbarButton {

    constructor() {
    }

    id = 1;
    key = '';
    text = '';
    enabled = true;
    children = new Array<ToolbarButton>();
    alwaysOn = true;
    showDropDown = false;
    icon = '';
    explorer = true;
    reviewer = true;
    creator = true;
    show = true;
    popupText = '';
    requireACS = true;
    command: ApiTypes.AdeptCommandNumber;


    action(data: any) {
        //some stuff happens here
        alert("Not implemented");
    }

}
