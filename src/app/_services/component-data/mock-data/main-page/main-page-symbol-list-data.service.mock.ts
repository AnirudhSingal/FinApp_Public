import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SymbolData, SymbolDataAdapter } from 'src/app/_models/symbol-data';
import { SYMBOL_LIST } from './data/symbol-list-data';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainPageSymbolListDataServiceMock {

  constructor(
    protected  symbolDataAdapter: SymbolDataAdapter
  ) { }

  getData(): Observable<SymbolData[]> {
    return of(SYMBOL_LIST).pipe(
      map(symbolDataArray => symbolDataArray.map(symbolData => this.symbolDataAdapter.adapt(symbolData)))
    )
  }
}