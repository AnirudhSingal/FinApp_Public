import { Injectable } from '@angular/core';
import { CacheTransactionsService } from '../../caching/cache-transactions.service';
import { MainPageInfoForexListElementDataAdapter, MainPageInfoListElementData } from 'src/app/_models/main-page-info-list-element-data';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { CURRENCY_DATA } from '../mock-data/main-page/data/currency-list-data';
import { MainPageForexListDataServiceMock } from '../mock-data/main-page/main-page-forex-list-data.service.mock';


@Injectable({
  providedIn: 'root'
})
export class MainPageForexListDataService extends MainPageForexListDataServiceMock{

  constructor(
    private cacheService: CacheTransactionsService,
    protected dataAdapter: MainPageInfoForexListElementDataAdapter
  ) {
    super(dataAdapter);
  }

  getData(): Observable<MainPageInfoListElementData[] | []> {

    let forexList: Observable<any>;

    if(environment.FinDataApiKey === undefined){
      return super.getData();
    }else{
      return this.cacheService.getCacheable<any[]>(
        environment.FinDataApi + "fx", 3000
      ).pipe(
        map(value => {
          return value.map(val => {
            return this.dataAdapter.adapt(val)
          })
        })
      );
    }
  }
}