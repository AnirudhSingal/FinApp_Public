import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';
import { SymbolData } from '../_models/symbol-data';
import { Observable } from 'rxjs';
import { QuoteDataService } from '../_services/component-data/quote-card/quote-data.service';

@Pipe({
  name: 'GetSymbolName'
})
export class GetSymbolNamePipe implements PipeTransform {
  retVal: SymbolData[];
  constructor(
    private quoteData: QuoteDataService
  ) { }

  transform(value: string): Observable<string> {


    return this.quoteData.getQuoteData(value).pipe(
      map(element => {
        if (element != undefined) {
          return element[0]?.name
        }
        else {
          return ""
        }
      })
    )
  }
}
