import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { catchError, mergeMap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/x-www-form-urlencoded'
  })
};


@Injectable()
export class AuthService {
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
    return this.http.get('http://localhost:8686/synergis.webapi/api/account/logout');
  }

  public getNewToken(): void {
    let credentials = `grant_type=refresh_token&refresh_token=${this.refreshToken}&client_id=WebApi&client_secret=zd2345rtl`;
    this.http.post('http://localhost:8686/synergis.webapi/login', credentials, httpOptions).subscribe(data => {
      this.accessToken = data["access_token"];
      this.refreshToken = data["refresh_token"];
      this.retryFailedRequests();
    });
  }

  public collectFailedRequest(request): void {
    if (this.cachedRequests.length == 0) {
      this.getNewToken();
    } 
    this.cachedRequests.push(request);
  }
  public retryFailedRequests(): void {
    this.cachedRequests.forEach(request => {
      this.http.request(request);
    });
    this.cachedRequests = [];
  }

}