
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
import { ErrorService } from '../error/error.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private auth: AuthService;
    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    errorSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private inj: Injector, private errorService: ErrorService) {
        this.auth = this.inj.get(AuthService);
    }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        //console.log("adding token to:", req.url);
        return req.clone({ setHeaders: { Authorization: 'Bearer ' + this.auth.getToken(), 'Content-Type': 'application/json' } })
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        return next.handle(this.addToken(req, this.auth.getToken()))
            .pipe(catchError(err => {
                switch ((<HttpErrorResponse>err).status) {
                    case 400:
                        return this.handle401Error(req, next);
                    case 401:
                        return this.handle401Error(req, next);
                    default: 
                        return observableThrowError(err);
                }
            }));
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
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
                return this.logoutUser();
            }), catchError(error => {
                
                // If there is an exception calling 'refreshToken', bad news so logout.
                return this.logoutUser();
            }), finalize(() => {
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
            return this.logoutUser();
        }

        return observableThrowError(error);
    }

    handleOtherErrors(req: HttpRequest<any>, next: HttpHandler) {
        
    }

    logoutUser() {
        // Route to the login page
        return observableThrowError("Hello");
    }
}