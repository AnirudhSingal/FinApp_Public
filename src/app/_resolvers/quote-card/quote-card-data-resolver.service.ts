import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProfileAdapter, ProfileData } from '../../_models/profile-data';
import { QuoteCardData } from '../../_models/quote-card-data';
import { QuoteAdapter, QuoteData } from '../../_models/quote-data';
import { CacheTransactionsService } from '../../_services/caching/cache-transactions.service';


@Injectable({
    providedIn:'root'
})
export class QuoteCardDataResolverService implements Resolve<QuoteCardData>{
    
    constructor(
        private cacheService : CacheTransactionsService,
        private quoteAdapter: QuoteAdapter,
        private profileAdapter: ProfileAdapter
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : QuoteCardData | Observable<QuoteCardData> | Promise<QuoteCardData> {

        let symbolValue :string;
        symbolValue = route.params['symbol']

        let qouteReq = environment.FinDataApi + 'quote/'  + symbolValue.toUpperCase(); 
        let quoteData$ : Observable<QuoteData> = this.cacheService.getCacheable<QuoteData[]>(
          qouteReq, 3000).pipe(
              map(value => {
                  return this.quoteAdapter.adapt(value[0]);
                }));
    
        let profileReq = environment.FinDataApi + 'profile/'  + symbolValue; 
        let profileData$ : Observable<ProfileData> = this.cacheService.getCacheable<ProfileData[]>(
          profileReq, 3000).pipe(
              map(value => {
                  return this.profileAdapter.adapt(value[0]);
                }));

        let data$ : Observable<QuoteCardData> = zip(
          quoteData$, profileData$
        ).pipe(
          map( X =>{
            return Object.assign(X[0], X[1])
          }), 
          catchError(err =>{
              return [];
          })
        )
        return data$;
    }
}