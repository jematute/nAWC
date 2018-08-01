import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpHandler } from '@angular/common/http';

import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, mergeMap, switchMap, map, tap } from 'rxjs/operators';
import { User } from './user';
import { userModel } from '../classes/userModel';
import { Global } from '../classes/global';
import { Router } from '@angular/router';
import { LocalizationService } from '../localization/localization.service';

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

  constructor(private http: HttpClient, private router: Router, private locale: LocalizationService) {
    this.refreshToken = localStorage.getItem("refresh_token");
    let user = localStorage.getItem("userModel");
    if (user)
      this.user = JSON.parse(user) as userModel;
  }

  login(user: User, forceLogin: boolean): Observable<Object> {
    let credentials = `username=${user.loginName}&password=${user.password}&client_secret=zd2345rtl&client_id=Adept&grant_type=password&forceLogin=${forceLogin}`;
    return this.http.post(`${Global.API_URL}/login`, credentials, httpOptions).pipe(switchMap(data => {
      this.accessToken = data["access_token"];
      this.refreshToken = data["refresh_token"];
      localStorage.setItem("refresh_token", this.refreshToken);
      return this.getUserInfo();
    }));
    
    //return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
  }

  logOut(): Observable<any> {
    return this.http.get(`${Global.API_URL}/api/account/logout`).pipe(switchMap(result => {
      //clear the user and localstorage
      this.user = null;
      localStorage.setItem("userModel", "");
      return this.router.navigate(["/login"]);
    }));
  }

  getUserInfo(): Observable<userModel> {
    return this.http.get(`${Global.API_URL}/api/account/userinfo`).pipe(map(data => {
      this.user = data as userModel;
      localStorage.setItem("userModel", JSON.stringify(this.user));
      return data as userModel;
    }));
  }

  getToken() {
    return this.accessToken;
  }

  checkLogin(): Observable<Object> {
    return this.http.get(`${Global.API_URL}/api/account/isloggedin`);
  }

  getAppVersion(): Observable<any> {
    return this.http.get(`${Global.API_URL}/api/configuration/appversion`);
  }

  public getNewToken(): Observable<any> {
    let refreshToken = atob(this.refreshToken);
    let credentials = `grant_type=refresh_token&refresh_token=${refreshToken}&client_id=Adept&client_secret=zd2345rtl`;
    return this.http.post(`${Global.API_URL}/login`, credentials, httpOptions).pipe(map(data => {
        this.accessToken = data["access_token"];
        this.refreshToken = data["refresh_token"];
        localStorage.setItem("refresh_token", this.refreshToken);
        return data["access_token"];
    }));
  }

}