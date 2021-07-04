import { Injectable } from '@angular/core';
import { CacheTransactionsService } from '../../caching/cache-transactions.service';
import { SymbolDataAdapter, SymbolData } from 'src/app/_models/symbol-data';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { MainPageSymbolListDataServiceMock } from '../mock-data/main-page/main-page-symbol-list-data.service.mock';
import { environment } from 'src/environments/environment';
import { symbol } from 'd3';

@Injectable({
  providedIn: 'root'
})
export class MainPageSymbolListDataService extends MainPageSymbolListDataServiceMock {

  constructor(
    private cacheTransactions: CacheTransactionsService,
    protected symbolDataAdapter: SymbolDataAdapter
  ) {
    super(symbolDataAdapter);
  }

  getData() : Observable<SymbolData[]> {


    if(environment.FinDataApiKey === undefined){
      return super.getData();
    }else{
      return this.cacheTransactions.getCacheable<SymbolData[]>(
        environment.FinDataApi + 'stock/list', 300000
      ).pipe(
        map(value => {
          value.map(val => this.symbolDataAdapter.adapt(val))
          return value.filter(val => !(val.name == undefined || val.symbol == undefined || val.price == 0))
        })
      );
    }
  }
}
