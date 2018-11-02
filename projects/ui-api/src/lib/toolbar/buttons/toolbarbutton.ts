
import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';
import { ToolbarService } from '../toolbar.service';

export abstract class ToolbarButton {

    constructor(private toolbar: ToolbarService) {
    }

    service: ToolbarService;
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
        this.toolbar.onButtonClicked.emit();
    }
}
