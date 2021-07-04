import { Injectable } from '@angular/core';
import { Observable, zip } from 'rxjs';
import { QuoteCardData } from 'src/app/_models/quote-card-data';
import { environment } from 'src/environments/environment';
import { QuoteData, QuoteAdapter } from 'src/app/_models/quote-data';
import { map, catchError } from 'rxjs/operators';
import { ProfileData, ProfileAdapter } from 'src/app/_models/profile-data';
import { CacheTransactionsService } from '../../caching/cache-transactions.service';
import { QuoteCardDataServiceMock } from '../mock-data/quote-card/quote-card-data.service.mock';

@Injectable({
  providedIn: 'root'
})
export class QuoteCardDataService extends QuoteCardDataServiceMock {

  constructor(
    private cacheService: CacheTransactionsService,
    private quoteAdapter: QuoteAdapter,
    private profileAdapter: ProfileAdapter
  ) {
    super();
  }
  getData(symbol: string): Observable<QuoteCardData> {

    if (environment.FinDataApiKey === undefined) {
      return super.getData(symbol);
    } else {

      let symbolValue: string;
      symbolValue = symbol.toUpperCase();

      let qouteReq = environment.FinDataApi + 'quote/' + symbolValue;
      let quoteData$: Observable<QuoteData> = this.cacheService.getCacheable<QuoteData[]>(
        qouteReq, 3000).pipe(
          map(value => {
            return this.quoteAdapter.adapt(value[0]);
          }));

      let profileReq = environment.FinDataApi + 'profile/' + symbolValue;
      let profileData$: Observable<ProfileData> = this.cacheService.getCacheable<ProfileData[]>(
        profileReq, 3000).pipe(
          map(value => {
            return this.profileAdapter.adapt(value[0]);
          }));

      let data$: Observable<QuoteCardData> = zip(
        quoteData$, profileData$
      ).pipe(
        map(X => {
          return Object.assign(X[0], X[1])
        }),
        catchError(err => {
          return [];
        })
      )
      return data$;
    }
  }
}