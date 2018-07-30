import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from '../../../node_modules/rxjs';
import { Global } from '../classes/global';
import { AuthService } from '../login/auth.service';
import { LocalizationService } from '../localization/localization.service';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { tap, catchError, switchMap } from '../../../node_modules/rxjs/operators';
import { ThrowStmt } from '../../../node_modules/@angular/compiler';
import { BowserService } from '../../../node_modules/ngx-bowser';

@Injectable({
  providedIn: 'root'
})
export class ClientServicesService {

  constructor(private auth: AuthService, private locale: LocalizationService, private http: HttpClient, private bowser: BowserService) { }

  accessToken: string;

  loginToACS(): Observable<any> {
    const credentials = {
      grant_type: "password",
      webapiurl: Global.API_URL,
      webapitoken: this.auth.accessToken,
      username: this.auth.user.LoginName,
      culture: this.locale.language,
    }

    let data = `grant_type=password&webapiurl=${Global.API_URL}/&webapitoken=${this.auth.accessToken}&username=${this.auth.user.LoginName}&culture=&${this.locale.language}`;

    return this.http.post(`${Global.ACS_URL}/token`, data).pipe(tap(resp => {
      this.accessToken = resp["access_token"];
      console.log("acs token", this.accessToken);
    }), catchError(err => {
      if (err.name.indexOf("Timeout") != -1)
        console.log("timeout occurred")
      return observableThrowError(err);
    }));
  }   

  timeout() {
    this.http.get(`${Global.ACS_URL}/api/document/timeout`).subscribe();
  }

  


}
