import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CurrencyListData } from 'src/app/_models/list-page-models/currency-list-data';
import { CURRENCY_DATA } from './data/currencies-data';

@Injectable({
  providedIn: 'root'
})
export class CurrencyListDataServiceMock {

  constructor() { }


  getData(): Observable<CurrencyListData[]> {
    return of(CURRENCY_DATA)
  }
}