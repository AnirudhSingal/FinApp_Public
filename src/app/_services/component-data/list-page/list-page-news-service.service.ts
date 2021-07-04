import { Injectable } from '@angular/core';
import { CacheTransactionsService } from '../../caching/cache-transactions.service';
import { Observable } from 'rxjs';
import { NewsData } from 'src/app/_models/news-data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListPageNewsServiceService {

  constructor(
    private cacheService: CacheTransactionsService
  ) { }

  getData(symbolList: string, limit:number):Observable<NewsData[]>{
    let req = environment.FinDataApi + 'stock_news?tickers='  + symbolList + '&limit=' + limit;
    let newsData = this.cacheService.getCacheable<NewsData[]>(
      req, 60000
    );
    return newsData;
  }
}
