import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsData, NewsDataAdapter } from 'src/app/_models/news-data';
import { PressReleaseData } from 'src/app/_models/press-release-data';
import { environment } from 'src/environments/environment';
import { CacheTransactionsService } from '../../caching/cache-transactions.service';
import { map } from 'rxjs/operators';
import { QuoteCardNewsPressReleaseDataServiceMock } from '../mock-data/quote-card/quote-card-news-press-release-data.service.mock';

@Injectable({
  providedIn: 'root'
})
export class QuoteCardNewsPressReleaseDataService extends QuoteCardNewsPressReleaseDataServiceMock {

  
  
  constructor(
    private cacheService: CacheTransactionsService,
    private newsDataAdapter: NewsDataAdapter
  ) {
    super();
   }

  getNewsdata(symbol: string, limit:number):Observable<NewsData[]>{

    if (environment.FinDataApiKey === undefined) {
      return super.getNewsdata(symbol, limit);
    } else {
      let req = environment.FinDataApi + 'stock_news?tickers='  + symbol + '&limit=' + limit;
      let newsData = this.cacheService.getCacheable<NewsData[]>(
        req, 60000
      ).pipe(map(datas =>{
        return datas.map(data => {
          return this.newsDataAdapter.adapt(data);
        })
      }));
      return newsData;
    }
  }

  getPressReleaseData(symbol: string, limit:number) : Observable<PressReleaseData[]>{
    if (environment.FinDataApiKey === undefined) {
      return super.getPressReleaseData(symbol, limit);
    } else {
      let req = environment.FinDataApi + 'press-releases/' + symbol + '?limit=' + limit;
      let pressReleaseData = this.cacheService.getCacheable<PressReleaseData[]>(
        req, 60000
      ).pipe(map(datas =>{
        return datas.map(data => {
          return this.newsDataAdapter.adapt(data);
        })
      }));
      return pressReleaseData;
    }
  }
}
