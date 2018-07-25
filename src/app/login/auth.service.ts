import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpHandler } from '@angular/common/http';

import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, mergeMap, switchMap, map, tap } from 'rxjs/operators';
import { User } from './user';
import { userModel } from '../classes/userModel';
import { Global } from '../classes/global';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded'
  })
};

@Injectable()
export class AuthService {
  tokenSubject: any;
  isRefreshingToken: any;

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  accessToken: string;
  refreshToken: string;
  cachedRequests: Array<HttpRequest<any>> = [];
  autoLogin: boolean;
  user: userModel;

  constructor(private http: HttpClient ) {
    this.refreshToken = localStorage.getItem("refresh_token");
    this.user = JSON.parse(localStorage.getItem("userModel")) as userModel;
  }

  login(user: User): Observable<Object> {
    let credentials = `username=${user.loginName}&password=${user.password}&client_secret=zd2345rtl&client_id=WebApi&grant_type=password`;
    return this.http.post(`${Global.API_URL}/login`, credentials, httpOptions).pipe(switchMap(data => {
      this.accessToken = data["access_token"];
      this.refreshToken = data["refresh_token"];
      localStorage.setItem("refresh_token", this.refreshToken);
      return this.getUserInfo();
    }));
    
    //return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  getUserInfo(): Observable<userModel> {
    return this.http.get(`${Global.API_URL}/api/account/userinfo`).pipe(map(data => {
      this.user = data as userModel;
      localStorage.setItem("userModel", JSON.stringify(this.user));
      console.log(this.user);
      return data as userModel;
    }));
  }

  getToken() {
    return this.accessToken;
  }

  something(): Observable<Object> {
    return this.http.get(`${Global.API_URL}/api/column/allavailable`);
  }

  checkLogin(): Observable<Object> {
    return this.http.get(`${Global.API_URL}/api/account/isloggedin`);
  }

  getAppVersion(): Observable<any> {
    return this.http.get(`${Global.API_URL}/api/configuration/appversion`);
  }

  public getNewToken(): Observable<any> {
    let refreshToken = atob(this.refreshToken);
    let credentials = `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=WebApi&client_secret=zd2345rtl`;
    return this.http.post(`${Global.API_URL}/login`, credentials, httpOptions).pipe(map(data => {
        this.accessToken = data["access_token"];
        this.refreshToken = data["refresh_token"];
        localStorage.setItem("refresh_token", this.refreshToken);
        return data["access_token"];
    }));
  }

}