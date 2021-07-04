import { Injectable } from '@angular/core';
import { CacheTransactionsService } from '../../caching/cache-transactions.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { CryptoCurrencyListData, CryptoCurrencyListDataAdapter } from 'src/app/_models/list-page-models/crypto-currency-list-data';
import { CryptoCurrencyListDataServiceMock } from '../mock-data/list-page/crypto-currency-list-data.service.mock';

@Injectable({
  providedIn: 'root'
})
export class CryptoCurrencyListDataService extends CryptoCurrencyListDataServiceMock {

  constructor(
    private cacheTransactions: CacheTransactionsService,
    protected cryptoCurrencyListPageDataAdapter: CryptoCurrencyListDataAdapter,
  ) {
    super(cryptoCurrencyListPageDataAdapter);
  }

  getData(): Observable<CryptoCurrencyListData[]> {


    if (environment.FinDataApiKey === undefined) {
      return super.getData();
    } else {
      return this.cacheTransactions.getCacheable<any[]>(
        environment.FinDataApi + "quotes/crypto", 60000
      ).pipe(
        map(dataList => {
          return dataList.map(data => {
            return this.cryptoCurrencyListPageDataAdapter.adapt(data);
          })
        }),
        catchError(err => {
          return [];
        })
      )
    }
  }
}