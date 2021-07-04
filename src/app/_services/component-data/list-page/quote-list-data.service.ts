import { Injectable } from '@angular/core';
import { ObservableLike, Observable } from 'rxjs';
import { QuoteData, QuoteAdapter } from 'src/app/_models/quote-data';
import { CacheTransactionsService } from '../../caching/cache-transactions.service';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuoteListDataService {

  constructor(
    private quoteAdapter: QuoteAdapter,
    private cacheTransactions: CacheTransactionsService,
  ) { }

  getData(stockList : string) : Observable<QuoteData[]>{
    let quoteList : Observable<QuoteData[]> = this.cacheTransactions.getCacheable<any[]>(
      environment.FinDataApi + "quote/" + stockList, 60000
    ).pipe(
      map(dataList => {
        return  dataList.map(data => {
          return this.quoteAdapter.adapt(data)
        })
      })
    )
    return quoteList;
  }
}
