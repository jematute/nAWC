
import { MatDialog } from '@angular/material';

export interface ToolbarButton {
    id: number;
    key: string;
    text: string;
    enabled: boolean;
    action: Object;
    children: Array<ToolbarButton>;
    alwaysOn: boolean;
    showDropDown: boolean;
    icon: string;
    explorer: boolean;
    reviewer: boolean;
    creator: boolean;
    show: boolean;
    popupText: string;
    requireACS: boolean;
    dialog: MatDialog;

    onClick(data: any);

}