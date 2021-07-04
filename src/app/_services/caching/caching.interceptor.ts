import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse, HttpHeaders, HttpEventType, HttpParams } from '@angular/common/http';
import { Observable, of, from, ObservedValueOf, defer, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap, retry, retryWhen, flatMap, repeat, map, catchError} from 'rxjs/operators';
import { CacheTransactionsService } from './cache-transactions.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class CachingInterceptor implements HttpInterceptor  {

    constructor(private cache: CacheTransactionsService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.headers.get('Cacheable-Request') == undefined){
            return next.handle(req);
        }
        
        let expiryTime = req.headers.get('Expiry');
        
        const reqClone =  req.clone({headers: req.headers.delete('Cacheable-Request', '*').delete('Expiry',expiryTime)});
        return this.handle(reqClone, next, Number(expiryTime)).pipe(
            flatMap(_=>_),
        )
    }
    
    handle(req: HttpRequest<any>, next: HttpHandler, ms: number){

        
        return from( 
            this.cache.get(req)
            .then(_=>{
                if(_.responseObject == undefined || _.expiry == undefined){
                    throw new Error;
                }else{
                    return {
                        responseObject : _.responseObject,
                        expiry: _.expiry
                    }

                }
            })
            .then(cachedObject =>{
            if (cachedObject == undefined){
                throw new Error;
            }
            else{
                let expiry = cachedObject.expiry;

                if (Date.now() > expiry){

                    throw new Error;
                }
                
                let responseObject = JSON.parse(cachedObject.responseObject);
                return of(new HttpResponse({body: responseObject}));
            }})
            .catch(err => {
                return this.sendRequest(req,next).pipe(
                    tap(_ => {
                        if(_ instanceof HttpResponse){
                            
                            this.cache.delete(req);
                            this.cache.put(req,_.body,ms);
                        }
                    }),
                );
            })
        )
    }
    

    sendRequest(req: HttpRequest<any>, next: HttpHandler) {
  
        return next.handle(this.fullRequest(req));
    }

    fullRequest(req: HttpRequest<any>){

        let fullReq = req.clone({
            setParams:{
                apikey: environment.FinDataApiKey
            }
        })
        return  fullReq;
    }

}
