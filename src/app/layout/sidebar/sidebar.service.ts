import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class SidebarService {
    private _leftSidebarOpened: boolean = true;
    loadingIndicator = false;
    
    public onToggleLeftSidebar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    
    toggleSidebar() {
        this._leftSidebarOpened = !this._leftSidebarOpened;
        this.onToggleLeftSidebar.next(this._leftSidebarOpened);
    }

}