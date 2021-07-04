import { Injectable } from '@angular/core';
import { CacheTransactionsService } from '../../caching/cache-transactions.service';
import { KeyStatsDataAdapter, KeyStatsData } from 'src/app/_models/key-stats-data';
import { Observable, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { QouteCardKeyStatsDataServiceMock } from '../mock-data/quote-card/qoute-card-key-stats-data.service.mock';

@Injectable({
  providedIn: 'root'
})
export class QouteCardKeyStatsDataService extends QouteCardKeyStatsDataServiceMock {

  constructor(
    private cacheService: CacheTransactionsService,
    protected keyStatsDataAdapter: KeyStatsDataAdapter
  ) {
    super();
  }

  getData(symbol: string): Observable<KeyStatsData> {

    if (environment.FinDataApiKey === undefined) {
      return super.getData(symbol);
    } else {
      let symbolValue: string;
      symbolValue = symbol.toUpperCase();

      let quoteReq = environment.FinDataApi + 'quote/' + symbolValue;
      let quoteData$: Observable<any> = this.cacheService.getCacheable(quoteReq, 60000)
        .pipe(
          map((res: Response) => {
            return {
              "name": res?.[0]?.name,
              "marketCap": res?.[0]?.marketCap,
              "eps": res?.[0]?.eps,
              "sharesOutstanding": res?.[0]?.sharesOutstanding,
            }
          }),
          // catchError(err=> {
          //   return of({
          //     "name": null,
          //     "marketCap": null,
          //     "eps": null,
          //     "sharesOutstanding": null,
          //   }) 
          // })
        );

      let ratiosReq = environment.FinDataApi + 'ratios-ttm/' + symbolValue;
      let ratiosData$: Observable<any> = this.cacheService.getCacheable(ratiosReq, 3600000)
        .pipe(
          map((res: Response) => {
            return {
              "peRatioTTM": res?.[0]?.peRatioTTM,
              "priceToBookRatioTTM": res?.[0]?.priceToBookRatioTTM,
              "priceToSalesRatioTTM": res?.[0]?.priceToSalesRatioTTM
            }
          }),
          // catchError(err=>{
          //   return of({
          //     "peRatioTTM": null,
          //     "priceToBookRatioTTM": null,
          //     "priceToSalesRatioTTM": null
          //   })
          // })
        );

      let dividendReq = environment.FinDataApi + 'historical-price-full/stock_dividend/' + symbolValue;
      let dividendData$: Observable<any> = this.cacheService.getCacheable(dividendReq, 60000)
        .pipe(
          map((res: any) => {
            return {
              "lastDividendReported": res?.historical?.[0]?.dividend,
            }
          }),
          // catchError(err=>{
          //   return of({
          //     "lastDividendReported": null,
          //   })
          // })
        )

      let incomeStatementReq = environment.FinDataApi + 'income-statement/' + symbolValue + '?limit=4';
      let incomeStatementData$: Observable<any> = this.cacheService.getCacheable(incomeStatementReq, 3600000)
        .pipe(
          map((res: Response) => {
            return {
              "ebitdaratio": res?.[0]?.ebitdaratio
            }
          }),
          // catchError(err=>{
          //   return of({
          //     "ebitdaratio": null
          //   })
          // })
        );

      let ret = forkJoin(quoteData$, ratiosData$, dividendData$, incomeStatementData$).pipe(
        map(_ => {
          let adapterInput = Object.assign(_[0], _[1], _[2], _[3]);
          let retVal = this.keyStatsDataAdapter.adapt(adapterInput);
          return retVal
        })
      )
      return ret;
    }
  }
}