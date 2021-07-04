import { Injectable } from '@angular/core';
import { NEWS_DATA, PRESS_RELEASE_DATA } from './data/news-press-release-data';
import { of, Observable } from 'rxjs';
import { NewsData } from 'src/app/_models/news-data';
import { PressReleaseData } from 'src/app/_models/press-release-data';

@Injectable({
  providedIn: 'root'
})
export class QuoteCardNewsPressReleaseDataServiceMock {



  constructor(
  ) { }

  getNewsdata(symbol: string, limit: number): Observable<NewsData[]> {
    const cardData = NEWS_DATA.find(el => el.symbol === symbol).data
    return of(cardData);
  }

  getPressReleaseData(symbol: string, limit: number): Observable<PressReleaseData[]> {
    const cardData = PRESS_RELEASE_DATA.find(el => el.symbol === symbol).data
    return of(cardData);
  }
}
