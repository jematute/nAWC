import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ResultsComponent } from '../results/results.component';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from './auth.guard';
import { DatacardComponent } from '../datacard/datacard.component';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent, canActivate: [ AuthGuard ],
  children: [{
    path: 'home',
    component: HomeComponent
  }, {
    path: 'datacard',
    component: DatacardComponent
  }, {
    path: 'results',
    component: ResultsComponent,
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {
}
