import { Injectable } from '@angular/core';
import { KeyStatsDataAdapter, KeyStatsData } from 'src/app/_models/key-stats-data';
import { Observable, forkJoin, of } from 'rxjs';
import { map, find } from 'rxjs/operators';
import { KEY_STATS_DATA } from './data/key-stats-data';

@Injectable({
  providedIn: 'root'
})
export class QouteCardKeyStatsDataServiceMock {

  constructor() { }

  getData(symbol: string): Observable<KeyStatsData> {
    const keyData = KEY_STATS_DATA.find(el => el.symbol === symbol).data
    return of(keyData)
  }
}