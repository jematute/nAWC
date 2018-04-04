import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ResultsComponent } from '../results/results.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './auth.guard';

const LAYOUT_COMPONENTS = [
    LayoutComponent, ResultsComponent, HeaderComponent
];

@NgModule({
  imports: [
    LayoutRoutingModule
  ],
  declarations: [
    ...LAYOUT_COMPONENTS,
  ],
  exports: [ ], 
  providers: [ AuthGuard ]
})
export class LayoutModule {
}
