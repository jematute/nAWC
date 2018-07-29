
import {throwError as observableThrowError,  Observable ,  BehaviorSubject, of } from 'rxjs';
import { switchMap, map, catchError, finalize, tap, filter, take } from 'rxjs/operators';

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
import { Router } from '../../../node_modules/@angular/router';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';
import { ClientServicesService } from '../client-services/client-services.service';

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
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + this.auth.getToken(), 'Content-Type': 'application/json' } })
    }

    addACSToken(req: HttpRequest<any>): HttpRequest<any> {
        //console.log("adding token to:", req.url);
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + this.acs.accessToken, 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } })
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        
        if (req.url.toLowerCase().indexOf('synergis.webapi') != -1)
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
        else if (req.url.indexOf(':4040') || req.url.indexOf(':4343')) {
            return next.handle(this.addACSToken(req)).pipe(catchError(err => {
                return observableThrowError(err);
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
                    return next.handle(this.addToken(req,newToken));
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

            return this.auth.getNewToken().pipe(switchMap((newToken: string) => {
                if (newToken) {
                    this.tokenSubject.next(newToken);
                    return next.handle(this.addToken(req,newToken));
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

    handle400Error(error) {
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
            return this.logoutUser(error);
        }

        return observableThrowError(error);
    }

    handleACS400Error(error) {
        console.log("handling 400");
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
            return this.logoutUser(error);
        }

        return observableThrowError(error);
    }

    handleOtherErrors(resp) {
        console.log("handling other errors");
        console.log(resp);
        this.errorDialog.showError("Server Error", resp.error.Message);
        return observableThrowError(resp);
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