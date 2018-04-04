import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    private auth: AuthService;
    constructor(private inj: Injector) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.auth = this.inj.get(AuthService);
        request = request.clone({
            setHeaders: {
            Authorization: `Bearer ${this.auth.getToken()}`
        }
    });
        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {

            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                  this.auth.collectFailedRequest(request);
                }
            }
        });
    }
}