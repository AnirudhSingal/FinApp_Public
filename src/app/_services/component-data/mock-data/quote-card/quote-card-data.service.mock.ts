import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { QuoteCardData } from 'src/app/_models/quote-card-data';

import { QUOTE_CARD_DATA } from './data/quote-card-data';

@Injectable({
  providedIn: 'root'
})
export class QuoteCardDataServiceMock {

  constructor() { }
  getData(symbol: string): Observable<QuoteCardData> {
    const cardData = QUOTE_CARD_DATA.find(el => el.symbol === symbol).data
    return of(cardData);
  }
}