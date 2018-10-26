import { ToolbarButton } from '../toolbar/buttons/toolbarbutton';

export class Tab {
    name: string;
    active = false;
    items: Array<ToolbarButton>;
}
