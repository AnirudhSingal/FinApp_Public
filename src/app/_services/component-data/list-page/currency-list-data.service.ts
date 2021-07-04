import { Injectable } from '@angular/core';
import { CacheTransactionsService } from '../../caching/cache-transactions.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CurrencyListData, CurrencyListDataAdapter } from 'src/app/_models/list-page-models/currency-list-data';
import { map, catchError } from 'rxjs/operators';
import { CurrencyListDataServiceMock } from '../mock-data/list-page/currency-list-data.service.mock';

@Injectable({
  providedIn: 'root'
})
export class CurrencyListDataService extends CurrencyListDataServiceMock {

  constructor(
    private cacheTransactions: CacheTransactionsService,
    private currencyListPageDataAdapter: CurrencyListDataAdapter,
  ) {
    super();
  }

  getData(): Observable<CurrencyListData[]> {


    if (environment.FinDataApiKey === undefined) {
      return super.getData();
    } else {
      return this.cacheTransactions.getCacheable<any[]>(
        environment.FinDataApi + "quotes/forex", 60000
      ).pipe(
        map(dataList => {
          return dataList.map(data => {
            return this.currencyListPageDataAdapter.adapt(data);
          })
        }),
        catchError(err => {
          return [];
        })
      )
    }
  }
}