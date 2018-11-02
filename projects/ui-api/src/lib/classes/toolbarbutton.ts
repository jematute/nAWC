
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';


export abstract class ToolbarButton {

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

    onClick(data: any) {
        alert('not implemented');
    }
}
