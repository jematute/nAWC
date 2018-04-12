import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ResultsComponent } from '../results/results.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth.guard';
import { NbPopoverComponent } from '@nebular/theme/components/popover/popover.component';
import { MaterialModule } from '../material/material.module';
import { ResultsModule } from '../results/results.module';
import { SearchModule } from '../search/search.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { HeaderModule } from './header/header.module';

const LAYOUT_COMPONENTS = [
    LayoutComponent
];

@NgModule({
  imports: [
    CommonModule, LayoutRoutingModule, MaterialModule, ResultsModule, SidebarModule, HeaderModule
  ],
  declarations: [
    ...LAYOUT_COMPONENTS
  ],
  exports: [ ], 
  providers: [ AuthGuard ]
})
export class LayoutModule {
}
