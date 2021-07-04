import { Injectable } from '@angular/core';
import { MainPageInfoStockListElementDataAdapter, MainPageInfoListElementData } from 'src/app/_models/main-page-info-list-element-data';
import { ListPageType } from 'src/app/_enums/list-page-type';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ACTIVE_STOCKS, TOP_GAINERS, TOP_LOSERS } from './data/stock-list-data';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainPageStockListDataServiceMock {

  constructor(
    protected dataAdapter: MainPageInfoStockListElementDataAdapter
  ) { }


  getData(type: ListPageType): Observable<MainPageInfoListElementData[]> {
    
    let stockList: Observable<any>;
    switch (type) {
      case ListPageType.Actives:
        stockList = of(ACTIVE_STOCKS)  
        break;
      case ListPageType.Gainers:
        stockList = of(TOP_GAINERS)  
        break;
      case ListPageType.Losers:
        stockList = of(TOP_LOSERS)  
        break;
      default:
        break;
    }
    return stockList.pipe(
      map(value => {
        return value.map(val => {
          return this.dataAdapter.adapt(val)
        })
      })
    );
  }




}
