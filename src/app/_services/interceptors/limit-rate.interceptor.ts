import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from, EMPTY } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CacheTransactionsService } from '../caching/cache-transactions.service';
import { delayedRetry } from './delay-retry';

@Injectable()
export class LimitRateInterceptor implements HttpInterceptor  {
    constructor(private cache: CacheTransactionsService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(

            
            delayedRetry(), // https://medium.com/angular-in-depth/retry-failed-http-requests-in-angular-f5959d486294
            catchError(error => {
                return EMPTY;
            })
        )
    }
}