import { Injectable } from '@angular/core';


@Injectable()
export class SidebarService {
    leftSidebarOpened = true;
    loadingIndicator = false;
}