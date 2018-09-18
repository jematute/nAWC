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
import { ClientServicesModule } from './client-services/client-services.module';
import { BowserModule, BowserService } from 'ngx-bowser';
import { SignalRModule, ConnectionTransports } from 'ng2-signalr';
import { AdeptApiModule } from 'adept-api';
// import { SignalRConfiguration, ConnectionTransport } from 'ng2-signalr';
// import { Global } from './classes/global';

// // >= v2.0.0
// export function createConfig(): SignalRConfiguration {
//   const c = new SignalRConfiguration();
//   c.hubName = 'userConnectionHub';
//   c.qs = { user: 'donald' };
//   c.url = Global.API_URL;
//   c.logging = true;
//   // >= v5.0.0
//   c.executeEventsInZone = true; // optional, default is true
//   c.executeErrorsInZone = false; // optional, default is false
//   c.executeStatusChangeInZone = true; // optional, default is true
//   return c;
// }

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [ ],
  imports: [
    BrowserModule, BrowserAnimationsModule, AdeptApiModule,
    AppRoutingModule, HttpClientModule, LoginModule, ClientServicesModule, BowserModule
  ],
  exports: [ ],
  bootstrap: [ AppComponent ],
  providers: [ HttpClient, LocalizationService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, GlobalsService, BowserService ]
})
export class AppModule { }

