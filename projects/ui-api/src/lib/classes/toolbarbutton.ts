import { MatDialog } from '@angular/material';
import { Observable, of } from 'rxjs';
import { ToolbarService } from '../toolbar/toolbar.service';

export class ToolbarButton {

    constructor(public toolbarService: ToolbarService) {
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
    begin(data: any) {
    }
    onClick(data: any) {
        this.toolbarService.buttonClicked(this.text).subscribe(resp => {
            if (resp === true) {
                this.begin(data);
            }
        });
    }



}
