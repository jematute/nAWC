
import { throwError as observableThrowError, Observable, BehaviorSubject, of } from 'rxjs';
import { switchMap, map, catchError, finalize, tap, filter, take, timeout } from 'rxjs/operators';

import { Injectable, Injector } from '@angular/core';

import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpResponse,
    HttpSentEvent,
    HttpHeaderResponse,
    HttpProgressEvent,
    HttpUserEvent
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';
import { ClientServicesService } from '../client-services/client-services.service';
import { Global } from '../classes/global';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private auth: AuthService;
    private acs: ClientServicesService;
    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    errorSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private inj: Injector, private router: Router, private errorDialog: ErrorDialogService) {
        this.auth = this.inj.get(AuthService);
        this.acs = this.inj.get(ClientServicesService);
    }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        //console.log("adding token to:", req.url);
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + this.auth.getToken(), 'Content-Type': 'application/json' } });
    }
    addACSToken(req: HttpRequest<any>): HttpRequest<any> {
        //console.log("adding token to:", req.url);
        if (req.url.indexOf("token") !== -1)
            return req.clone({ setHeaders: { 'Content-Type': 'application/x-www-form-urlencoded' } });
        else
            return req.clone({ setHeaders: { Authorization: 'Bearer ' + this.acs.accessToken, 'Content-Type': 'application/json' } });

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
       
        if (req.url.indexOf(Global.ACS_URL) != -1) {
            return next.handle(this.addACSToken(req)).pipe(catchError(err => {
                if (err.name.indexOf("Timeout") != -1)
                    return observableThrowError(err);
                switch ((<HttpErrorResponse>err).status) {
                    case 400:
                        return this.handleACS400Error(req, next, err);
                    case 401:
                        return this.handleACS401Error(req, next);
                    case 0:
                        return this.handleACSNotRunning(req, next, err);
                    default:
                        return this.handleOtherErrors(err);
                }
            }));
        }
        else {
            return next.handle(this.addToken(req, this.auth.getToken()))
                .pipe(catchError(err => {
                    console.log("error thrown status:", (<HttpErrorResponse>err).status)
                    switch ((<HttpErrorResponse>err).status) {
                        case 400:
                            return this.handle400Error(err);
                        case 401:
                            return this.handle401Error(req, next);
                        default:
                            return this.handleOtherErrors(err);
                    }
                }));
        }
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        console.log("Handling 401");
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);

            return this.auth.getNewToken().pipe(switchMap((newToken: string) => {
                if (newToken) {
                    this.tokenSubject.next(newToken);
                    return next.handle(this.addToken(req, newToken));
                }
                // If we don't get a new token, we are in trouble so logout.
                return this.logoutUser("no token");
            }), catchError(error => {
                // If there is an exception calling 'refreshToken', bad news so logout.
                if (error.status == 400)
                    return this.logoutUser(error);
                return this.handleOtherErrors(error);
            }), finalize(() => {
                console.log("no longer refreshing token");
                this.isRefreshingToken = false;
            }));
        }
        else {
            return this.tokenSubject.pipe(filter(token => token != null), take(1), switchMap(token => {
                return next.handle(this.addToken(req, token));
            }));
        }
    }

    handleACS401Error(req: HttpRequest<any>, next: HttpHandler) {
        console.log("Handling 401 ACS");
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);

            return this.acs.loginToACS().pipe(switchMap((newToken: string) => {
                if (newToken) {
                    this.tokenSubject.next(newToken);
                    return next.handle(this.addACSToken(req));
                }
                // If we don't get a new token, we are in trouble so logout.
                return this.logoutUser("no token");
            }), catchError(error => {
                // If there is an exception calling 'refreshToken', bad news so logout.
                return this.handleOtherErrors(error);
            }), finalize(() => {
                console.log("no longer refreshing token");
                this.isRefreshingToken = false;
            }));
        }
        else {
            return this.tokenSubject.pipe(filter(token => token != null), take(1), switchMap(token => {
                return next.handle(this.addACSToken(req));
            }));
        }
    }

    handleACS400Error(req: HttpRequest<any>, next: HttpHandler, error) {
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
            return this.auth.getNewToken().pipe(switchMap((newToken: string) => {
                console.log("body", req.body);
                return this.acs.loginToACS();
            }));
        }

        return observableThrowError(error);
    }

    handle400Error(error) {
        console.log("handling 400");
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
            return this.logoutUser(error);
        }

        return observableThrowError(error);
    }

    handleOtherErrors(resp) {
        //console.log("handling other errors");
        //console.log(resp);
        let error = "";
        if (resp.error.Message)
            error = resp.error.Message;
        if (resp.error.ExceptionMessage)
            error = resp.error.ExceptionMessage
        this.errorDialog.showError("Server Error", error);
        return observableThrowError(resp);
    }

    handleACSNotRunning(req: HttpRequest<any>, next: HttpHandler, error) {
        return this.acs.launchACS().pipe(switchMap(resp => {
            return this.auth.getNewToken().pipe(switchMap(resp => {
                return this.acs.loginToACS().pipe(switchMap(resp => {
                    return next.handle(this.addACSToken(req));
                }));
            }));           
        }), catchError(err => {
            console.log(err);
            return observableThrowError(err);
        }))
    }

    logoutUser(err) {
        console.log("log out user");
        // Route to the login page
        this.router.navigate(['login']);
        localStorage.setItem("userModel", "");
        if (err)
            if (err.error) {
                if (err.error.error_description) {
                    err = err.error.error_description;
                }
            }

        return observableThrowError(err);
    }
}