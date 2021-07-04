import { Injectable } from '@angular/core';
import { QuoteAdapter, QuoteData } from 'src/app/_models/quote-data';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { QUOTE_DATA } from './data/quote-data';

@Injectable({
  providedIn: 'root'
})
export class QuoteDataServiceMock {

  constructor(
  ) { }

  getData(symbol: string) : Observable<QuoteData[]>{
    const qouteData = QUOTE_DATA.find(el => el.symbol === symbol).data;
    return of(qouteData)
  }
}
