import { ToolbarButton } from './toolbarbutton';

export class Tab {
    name: string;
    active = false;
    items: Array<ToolbarButton>;
}
