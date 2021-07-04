import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { ListPageType } from 'src/app/_enums/list-page-type';
import { ACTIVE_STOCKS_DATA } from './data/active-stocks-data';
import { TOP_GAINER_STOCKS_DATA } from './data/top-gainer-stocks-data';
import { TOP_LOSER_STOCKS_DATA } from './data/top-loser-stocks-data';

@Injectable({
  providedIn: 'root'
})
export class StockListDataServiceMock {

  constructor() { }
  getData(listType: ListPageType) {
    switch (listType) {
      case ListPageType.Actives:
        return of(ACTIVE_STOCKS_DATA)
      case ListPageType.Losers:
        return of(TOP_LOSER_STOCKS_DATA)
      case ListPageType.Gainers:
        return of(TOP_GAINER_STOCKS_DATA)
      default:
        break;
    }
  }
}