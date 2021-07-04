import { Observable, of, throwError, from, EMPTY } from 'rxjs';
import { retryWhen, delay, mergeMap, delayWhen, map } from 'rxjs/operators';

const DEFAULT_MAX_RETRIES = 5;

export function delayedRetry(){
    let retries = DEFAULT_MAX_RETRIES;

    return(src: Observable<any>) => 
        src.pipe(
            retryWhen((errors:Observable<any>) => errors.pipe(
                mergeMap(async (error) => {
                    if(error.status === 429){
                        return setTimeout(() => {
                            return of(error)
                        }, error.error['X-Rate-Limit-Retry-After-Milliseconds'] )
                    }else{
                        throw error;
                        // return Observable.throw(error)
                    }
                })
                // return retries-- > 0 ? of(error): throwError("Error getting data")
            ))
        );
}