import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CryptoCurrencyListData, CryptoCurrencyListDataAdapter } from 'src/app/_models/list-page-models/crypto-currency-list-data';
import { CRYPTOCURRENCY_DATA } from './data/crypto-currencies-data';

@Injectable({
  providedIn: 'root'
})
export class CryptoCurrencyListDataServiceMock {

  constructor(
    protected cryptoCurrencyListPageDataAdapter: CryptoCurrencyListDataAdapter,
  ) { }

  getData(): Observable<CryptoCurrencyListData[]> {
    return of(CRYPTOCURRENCY_DATA)
  }
}