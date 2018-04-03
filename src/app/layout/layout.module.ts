import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { ResultsComponent } from '../results/results.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from '../auth.guard';
import { AuthService } from '../login/auth.service';

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
  providers: [ AuthGuard, AuthService ],
  exports: []
})
export class LayoutModule {
}
