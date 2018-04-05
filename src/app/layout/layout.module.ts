import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ResultsComponent } from '../results/results.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth.guard';
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbContextMenuModule, NbPopoverModule, NbMenuModule } from '@nebular/theme';
import { NbPopoverComponent } from '@nebular/theme/components/popover/popover.component';

const LAYOUT_COMPONENTS = [
    LayoutComponent, ResultsComponent, HeaderComponent
];

@NgModule({
  imports: [
    LayoutRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    NbContextMenuModule,
    NbPopoverModule,
    NbMenuModule
  ],
  declarations: [
    ...LAYOUT_COMPONENTS,
  ],
  exports: [ ], 
  providers: [ AuthGuard, NbSidebarService ]
})
export class LayoutModule {
}
