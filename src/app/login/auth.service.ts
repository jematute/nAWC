import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpHandler } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded'
  })
};


@Injectable()
export class AuthService {
  tokenSubject: any;
  isRefreshingToken: any;
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  accessToken: string;
  refreshToken: string;
  cachedRequests: Array<HttpRequest<any>> = [];

  constructor(private http: HttpClient) {

  }

  login(): Observable<Object> {
    let credentials = "username=juan.matute&password=kemdog&client_secret=zd2345rtl&client_id=WebApi&grant_type=password";
    return this.http.post('http://localhost:8686/synergis.webapi/login', credentials, httpOptions).map(data => {
      this.accessToken = data["access_token"];
      this.refreshToken = data["refresh_token"];
      this.isLoggedIn = true;
      return data;
    });
    
    //return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  getToken() {
    return this.accessToken;
  }

  something(): Observable<Object> {
    return this.http.get('http://localhost:8686/synergis.webapi/api/column/allavailable');
  }

  public getNewToken(): Observable<string> {
    console.log("Refreshing Token: " + this.refreshToken);
    let refreshToken = atob(this.refreshToken);
    let credentials = `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=WebApi&client_secret=zd2345rtl`;
    return this.http.post('http://localhost:8686/synergis.webapi/login', credentials, httpOptions).map(data => {
        console.log("token refreshed successfully: " + this.refreshToken);
        this.accessToken = data["access_token"];
        this.refreshToken = data["refresh_token"];
        return data["access_token"];
    });
  }

}