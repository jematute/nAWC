import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './login/auth.service';
import { AuthInterceptor } from './login/auth.interceptor';
import { LoginModule } from './login/login.module';
import { ErrorModule } from './error/error.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, LoginModule, ErrorModule
  ],
  bootstrap: [ AppComponent ],
  providers: [ { provide: APP_BASE_HREF, useValue: '/' }, HttpClient, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  } ]
})
export class AppModule { }
