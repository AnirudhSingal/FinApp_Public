import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MainPageInfoListElementData, MainPageInfoCryptocurrencyListElementDataAdapter } from 'src/app/_models/main-page-info-list-element-data';
import { CRYPTOCURRENCY_DATA } from './data/cryptocurrency-list-data';

@Injectable({
  providedIn: 'root'
})
export class MainPageCryptocurrencyListDataServiceMock {

  constructor(
    protected dataAdapter: MainPageInfoCryptocurrencyListElementDataAdapter
  ) { }

  getData(): Observable<MainPageInfoListElementData[] | []> {
    return of(CRYPTOCURRENCY_DATA)
  }
}