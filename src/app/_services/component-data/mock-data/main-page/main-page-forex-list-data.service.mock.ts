import { Injectable } from '@angular/core';
import { MainPageInfoForexListElementDataAdapter, MainPageInfoListElementData } from 'src/app/_models/main-page-info-list-element-data';
import { CURRENCY_DATA } from './data/currency-list-data';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainPageForexListDataServiceMock {

  constructor(
    protected dataAdapter: MainPageInfoForexListElementDataAdapter
  ) { }

  getData(): Observable<MainPageInfoListElementData[] | []> {
    return of(CURRENCY_DATA).pipe(
      map(value => {
        return value.map(val => {
          return this.dataAdapter.adapt(val)
        })
      })
    )
  }
}
