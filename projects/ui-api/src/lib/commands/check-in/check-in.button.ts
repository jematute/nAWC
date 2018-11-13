// import { CheckInService } from '../../commands/check-in/check-in.service';
import { SelectionItem } from '../../classes/selectionitem';
import { MatDialog } from '@angular/material';
import { ToolbarButton } from '../../classes/toolbarbutton';
import { CheckInComponent } from './check-in.component';

// import { CheckInComponent } from '../../commands/check-in/check-in.component';

// export class CheckInButton extends ToolbarButton {
// }

export class CheckInButton extends ToolbarButton {
    requireACS = true;
    id = 1;
    key = 'check-in';
    text: string;
    enabled: boolean;
    action: Object;
    alwaysOn: boolean;
    showDropDown: boolean;
    // tslint:disable-next-line:max-line-length
    icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0U2NEI2MkIxQjgwMTFFNjhBODdGRTNDOTFBMjY5QjAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0U2NEI2MkMxQjgwMTFFNjhBODdGRTNDOTFBMjY5QjAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozRTY0QjYyOTFCODAxMUU2OEE4N0ZFM0M5MUEyNjlCMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozRTY0QjYyQTFCODAxMUU2OEE4N0ZFM0M5MUEyNjlCMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PisXUx8AAAcESURBVHja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';
    explorer = false;
    reviewer = false;
    creator = true;
    show = true;
    popupText: string;
    dialog: MatDialog;

    onClick(selectionItems) {
        this.dialog.open(CheckInComponent, { data: selectionItems, panelClass: 'command-dialog' });
    }

}
