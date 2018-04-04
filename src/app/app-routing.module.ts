import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }      from './login/login.component';

const routes: Routes = [
  { path: 'layout', loadChildren: 'app/layout/layout.module#LayoutModule' },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '', redirectTo: 'layout', pathMatch: 'full' },
  { path: '**', redirectTo: 'layout' },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}
