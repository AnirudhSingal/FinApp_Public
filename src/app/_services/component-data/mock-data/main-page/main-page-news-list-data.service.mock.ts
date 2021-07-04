import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NewsData, NewsDataAdapter } from 'src/app/_models/news-data';
import { NEWS_DATA } from './data/news-list-data';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainPageNewsListDataServiceMock {

  constructor(
    protected newsDataAdapter: NewsDataAdapter
  ) { }

  getData(): Observable<NewsData[]> {
    return of(NEWS_DATA).pipe(
      map(newsArray => newsArray.map(news=> {
        return this.newsDataAdapter.adapt(news)
      } ))
    );
  }
}