import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuoteData } from 'src/app/_models/quote-data';
import { CacheTransactionsService } from 'src/app/_services/caching/cache-transactions.service';
import { QuoteDataServiceMock } from '../mock-data/quote-card/quote-data.service.mock';

@Injectable({
  providedIn: 'root'
})
export class QuoteDataService extends QuoteDataServiceMock {

  constructor(
    private cacheTransaction: CacheTransactionsService
  ) {
    super();
  }

  getQuoteData(symbol: string): Observable<QuoteData[]> {
    if (environment.FinDataApiKey === undefined) {
      return super.getData(symbol);
    } else {
      let req = environment.FinDataApi + 'quote/' + symbol;
      let quoteData = this.cacheTransaction.getCacheable<QuoteData[]>(
        req, 5000
      )
      return quoteData;
    }
  }
}