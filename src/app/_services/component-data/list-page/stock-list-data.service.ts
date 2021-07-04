import { Injectable } from '@angular/core';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CacheTransactionsService } from '../../caching/cache-transactions.service';
import { ListPageType } from 'src/app/_enums/list-page-type';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuoteData, QuoteAdapter } from 'src/app/_models/quote-data';
import { StockListData, StockListDataAdapter } from 'src/app/_models/list-page-models/stock-list-data';
import { StockListDataServiceMock } from '../mock-data/list-page/stock-list-data.service';

@Injectable({
  providedIn: 'root'
})
export class StockListDataService extends StockListDataServiceMock{

  constructor(
    private stockListAdapter: StockListDataAdapter,
    private cacheTransactions: CacheTransactionsService,
  ) { 
    super();
  }


  getData(listType: ListPageType) {

    if (environment.FinDataApiKey === undefined) {
      return super.getData(listType);
    
    } else {
      return this.getStockList(listType).pipe(
        mergeMap(data => {
          return this.getStockListData(data.join(","))
        }),
        catchError(err => {
          return [];
        })
      )
    }
  }

  private getStockList(type: ListPageType): Observable<String[]> {
    let requestLink :string
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
    let stockList = this.cacheTransactions.getCacheable<any[]>(
      requestLink, 60000
    ).pipe(
      map(value => {
        value = value.map(val => {
          return val['ticker'];
        })
        return value;
      }),
      catchError(err => {
        return [];
      })
    )
    return stockList;
  }

  private getStockListData(stockList : string) : Observable<StockListData[]>{
    return this.cacheTransactions.getCacheable<any[]>(
      environment.FinDataApi + "quote/" + stockList, 60000
    ).pipe(
      map(dataList => {
        return  dataList.map(data => {
          return this.stockListAdapter.adapt(data)
        })
      })
    )
  }
}
