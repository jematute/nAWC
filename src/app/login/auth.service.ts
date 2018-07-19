import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpHandler } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, mergeMap, switchMap, map } from 'rxjs/operators';
import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded'
  })
};

const webApiUrl: string = "http://wkst0835:8686/synergis.webapi";

@Injectable()
export class AuthService {
  tokenSubject: any;
  isRefreshingToken: any;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  accessToken: string;
  refreshToken: string;
  cachedRequests: Array<HttpRequest<any>> = [];

  constructor(private http: HttpClient) {
    this.refreshToken = localStorage.getItem("refresh_token");
  }

  login(user: User): Observable<Object> {
    let credentials = `username=${user.loginName}&password=${user.password}&client_secret=zd2345rtl&client_id=WebApi&grant_type=password`;
    return this.http.post(`${webApiUrl}/login`, credentials, httpOptions).pipe(map(data => {
      this.accessToken = data["access_token"];
      this.refreshToken = data["refresh_token"];
      localStorage.setItem("refresh_token", this.refreshToken);
      return data;
    }));
    
    //return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  getToken() {
    return this.accessToken;
  }

  something(): Observable<Object> {
    return this.http.get(`${webApiUrl}/api/column/allavailable`);
  }

  checkLogin(): Observable<Object> {
    return this.http.get(`${webApiUrl}/api/account/isloggedin`);
  }

  public getNewToken(): Observable<any> {
    let refreshToken = atob(this.refreshToken);
    let credentials = `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=WebApi&client_secret=zd2345rtl`;
    return this.http.post(`${webApiUrl}/login`, credentials, httpOptions).pipe(map(data => {
        this.accessToken = data["access_token"];
        this.refreshToken = data["refresh_token"];
        localStorage.setItem("refresh_token", this.refreshToken);
        return data["access_token"];
    }));
  }

}