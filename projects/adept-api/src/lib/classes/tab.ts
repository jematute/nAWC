import { ToolbarButton } from "./toolbarbutton";

export class Tab {
    name: string;
    active: boolean = false;
    items: Array<ToolbarButton>;
}