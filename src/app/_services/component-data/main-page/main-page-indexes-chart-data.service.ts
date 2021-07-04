import { Injectable } from '@angular/core';
import { StockChartDataService } from '../charts/stock-chart-data.service';
import { CacheTransactionsService } from '../../caching/cache-transactions.service';
import { Observable, forkJoin, of } from 'rxjs';
import { ChartTimeframes } from 'src/app/quote-page/quote-card-components/chart-timeframes';
import { environment } from 'src/environments/environment';
import { QuoteData, QuoteAdapter } from 'src/app/_models/quote-data';
import { map, tap } from 'rxjs/operators';
import { MainPageIndexesChartDataServiceMock } from '../mock-data/main-page/main-page-indexes-chart-data.service.mock';
import { ChartPointAdapter } from 'src/app/_models/chart-point';

@Injectable({
  providedIn: 'root'
})
export class MainPageIndexesChartDataService extends MainPageIndexesChartDataServiceMock {

  constructor(
    private quoteCardChartDataService: StockChartDataService,
    private cacheService: CacheTransactionsService,
    private quoteAdapter: QuoteAdapter,
    protected chartPointAdatper : ChartPointAdapter  
  ) {
    super(chartPointAdatper);
  }

  getData(symbolValue : string):Observable<any>{
    

    if(environment.FinDataApiKey === undefined){
      return super.getData(symbolValue);
    }else{
      let chartData$: Observable<any> = this.quoteCardChartDataService.getChartData(ChartTimeframes.day, symbolValue);
  
      let qouteReq = environment.FinDataApi + 'quote/' + symbolValue;
      let dataPoints$: Observable<QuoteData> = this.cacheService.getCacheable<QuoteData[]>(
        qouteReq, 60000).pipe(
          map(value => {
            return this.quoteAdapter.adapt(value[0]);
          }));
          
      let ret = forkJoin({
        chartData: chartData$,
        dataPoints: dataPoints$,
      })
      return ret;
    }
  }
}