import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError, interval, of } from 'rxjs';
import { Global } from 'projects/ui-api/src';
import { AuthService } from 'projects/ui-api/src';
import { LocalizationService } from 'projects/ui-api/src';
import { HttpClient } from '@angular/common/http';
import { tap, catchError, switchMap, delay, timeout, map, retry } from 'rxjs/operators';
import { BowserService } from 'ngx-bowser';
import { ajax } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root'
})
export class ClientServicesService {

  constructor(private auth: AuthService, public locale: LocalizationService, private http: HttpClient, private bowser: BowserService) { }

  accessToken: string;

  loginToACS(): Observable<any> {
    const credentials = {
      grant_type: 'password',
      webapiurl: Global.API_URL,
      webapitoken: this.auth.accessToken,
      username: this.auth.user.LoginName,
      culture: this.locale.language,
    };

    // tslint:disable-next-line:max-line-length
    const data = `grant_type=password&webapiurl=${window.location.origin}/Synergis.WebApi/&webapitoken=${this.auth.accessToken}&username=${this.auth.user.LoginName}&culture=&${this.locale.language}`;

    return this.http.post(`${Global.ACS_URL}/token`, data).pipe(map(resp => {
      this.accessToken = resp['access_token'];
      return this.accessToken;
    }), catchError(err => {
      if (err.name.indexOf('Timeout') !== -1) {
        console.log('timeout occurred');
      }
      return observableThrowError(err);
    }));
  }

  launchACS(): Observable<any> {
    window.location.href = 'adeptclientservices:start';
    return this.checkStatus();
  }

  getStatus() {
    return this.http.get(`${Global.ACS_URL}/api/status`);
  }

  acsError() {
    return this.http.get(`${Global.ACS_URL}/api/document/timeout`);
  }

  private checkStatus(): Observable<any> {
      return ajax(`${Global.ACS_URL}/api/status`).pipe(retry(15));
  }

}
