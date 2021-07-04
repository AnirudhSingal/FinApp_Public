import { Injectable } from '@angular/core';
import { MainPageInfoListElementData, MainPageInfoCryptocurrencyListElementDataAdapter } from 'src/app/_models/main-page-info-list-element-data';
import { CacheTransactionsService } from '../../caching/cache-transactions.service';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CRYPTOCURRENCY_DATA } from '../mock-data/main-page/data/cryptocurrency-list-data';
import { MainPageCryptocurrencyListDataServiceMock } from '../mock-data/main-page/main-page-cryptocurrency-list-data.service.mock';

@Injectable({
  providedIn: 'root'
})
export class MainPageCryptocurrencyListDataService extends MainPageCryptocurrencyListDataServiceMock {

  constructor(
    private cacheService: CacheTransactionsService,
    protected dataAdapter: MainPageInfoCryptocurrencyListElementDataAdapter
  ) {
    super(dataAdapter);
  }

  getData(): Observable<MainPageInfoListElementData[] | []> {
    if (environment.FinDataApiKey === undefined) {
      return super.getData();
    } else {
      return this.cacheService.getCacheable<any[]>(environment.FinDataApi + "quotes/crypto", 3000).pipe(
        map(value => {
          return value.map(val => {
            let data: MainPageInfoListElementData = this.dataAdapter.adapt(val);
            return data;
          })
        })
      )
    }
  }
}