import { Injectable } from '@angular/core';
import { CacheTransactionsService } from '../../caching/cache-transactions.service';
import { MainPageInfoStockListElementDataAdapter, MainPageInfoListElementData } from 'src/app/_models/main-page-info-list-element-data';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ListPageType } from 'src/app/_enums/list-page-type';
import { MainPageStockListDataServiceMock } from '../mock-data/main-page/main-page-stock-list-data.service.mock';

@Injectable({
  providedIn: 'root'
})
export class MainPageStocksListDataService extends MainPageStockListDataServiceMock {

  constructor(
    private cacheTransactions: CacheTransactionsService,
    protected dataAdapter: MainPageInfoStockListElementDataAdapter
  ) {
    super(dataAdapter);
  }

  getData(type: ListPageType): Observable<MainPageInfoListElementData[]> {

    let requestLink: string;


    switch (type) {
      case ListPageType.Actives:
        requestLink = environment.FinDataApi + "actives"
        break;
      case ListPageType.Gainers:
        requestLink = environment.FinDataApi + "gainers"
        break;
      case ListPageType.Losers:
        requestLink = environment.FinDataApi + "losers"
        break;
      default:
        break;
    }

    if(environment.FinDataApiKey === undefined){
      return super.getData(type);
    }else{
      return this.cacheTransactions.getCacheable<MainPageInfoListElementData[]>(
        requestLink, 3000).pipe(
        map(value => {
          return value.map(val => {
            return this.dataAdapter.adapt(val)
          })
        })
      );
    }
  }
}