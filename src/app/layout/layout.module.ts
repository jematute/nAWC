import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from './auth.guard';
import { ResultsModule } from '../results/results.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { HeaderModule } from './header/header.module';
import { DatacardModule } from '../datacard/datacard.module';
import { HomeModule } from '../home/home.module';
import { MaterialModule } from 'projects/ui-api/src';

const LAYOUT_COMPONENTS = [
    LayoutComponent
];

@NgModule({
  imports: [
    CommonModule, LayoutRoutingModule,
    MaterialModule, ResultsModule, SidebarModule,
    HeaderModule, DatacardModule, HomeModule
  ],
  declarations: [
    ...LAYOUT_COMPONENTS
  ],
  exports: [ ],
  providers: [ AuthGuard ]
})
export class LayoutModule {
}
