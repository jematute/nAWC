import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ResultsComponent } from '../results/results.component';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [{
  path: '',
  component: LayoutComponent, canActivate: [ AuthGuard ],
  children: [{
    path: 'results',
    component: ResultsComponent,
  }, {
    path: '',
    redirectTo: 'results',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {
}
