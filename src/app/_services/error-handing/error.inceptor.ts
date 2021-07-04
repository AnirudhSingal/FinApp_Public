import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export class ErrorInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            // tap(_=>{
            //     if(_ instanceof HttpResponse){
            //         if(_.body == null){
            //             // return throwError('null response!');
            //         }
            //     }
            // }),
            catchError(error =>{
                // 401 error
                console.log("error : ", error)
                if(error.status==401){
                    return throwError(error.statusText)
                }
            })
        )
    }

}