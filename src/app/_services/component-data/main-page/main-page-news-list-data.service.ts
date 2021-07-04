import { Injectable } from '@angular/core';
import { CacheTransactionsService } from '../../caching/cache-transactions.service';
import { NewsDataAdapter, NewsData } from 'src/app/_models/news-data';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MainPageNewsListDataServiceMock } from '../mock-data/main-page/main-page-news-list-data.service.mock';

@Injectable({
  providedIn: 'root'
})
export class MainPageNewsListDataService extends MainPageNewsListDataServiceMock {

  constructor(
    private cacheTransactions: CacheTransactionsService,
    protected newsDataAdapter: NewsDataAdapter
  ) {
    super(newsDataAdapter);
  }

  getData(): Observable<NewsData[]> {


    if (environment.FinDataApiKey === undefined) {
      return super.getData(); 
    } else {
      return this.cacheTransactions.getCacheable<NewsData[]>(
        environment.FinDataApi + 'stock_news?limit=100', 300000
      ).pipe(
        map(value => {
          value = value.map(val => this.newsDataAdapter.adapt(val))
          return value.filter(val => !(val.image == undefined || val.image == "" ||
            val.url == undefined || val.url == "" ||
            val.title == undefined || val.title == ""))
        })
      );
    }
  }
}