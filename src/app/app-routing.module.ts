import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }      from './login/login.component';
import { LoginResolver } from './login/login.resolver';

const routes: Routes = [
  { path: 'layout', loadChildren: 'app/layout/layout.module#LayoutModule', resolve: { message: LoginResolver } },
  {
    path: 'login',
    component: LoginComponent,
    resolve: { message: LoginResolver }
  },
  { path: '', redirectTo: 'layout', pathMatch: 'full' },
  { path: '**', redirectTo: 'layout' },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
  providers: [ LoginResolver ]
})
export class AppRoutingModule {}
