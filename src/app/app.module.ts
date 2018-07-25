import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './login/auth.service';
import { AuthInterceptor } from './login/auth.interceptor';
import { LoginModule } from './login/login.module';
import { LocalizationService } from './localization/localization.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GlobalsService } from './globals.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [ ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    AppRoutingModule, HttpClientModule, LoginModule,
  ],
  exports: [ ],
  bootstrap: [ AppComponent ],
  providers: [ { provide: APP_BASE_HREF, useValue: '/' }, HttpClient, LocalizationService, {
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptor,
    multi: true
  }, GlobalsService ]
})
export class AppModule { }
