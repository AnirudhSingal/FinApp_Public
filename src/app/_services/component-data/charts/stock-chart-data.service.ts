import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ChartPoint, ChartPointAdapter } from 'src/app/_models/chart-point';
import { CacheTransactionsService } from '../../caching/cache-transactions.service';
import { StockChartDataServiceMock } from '../mock-data/charts/stock-chart-data.service.mock';

@Injectable({
  providedIn: 'root'
})
export class StockChartDataService extends StockChartDataServiceMock {

  constructor(
    private cacheTransactionsService: CacheTransactionsService,
    private datePipe: DatePipe,
    protected chartPointAdapter: ChartPointAdapter,
  ) {
    super(chartPointAdapter);
  }

  // Get, clean and sort data
  public getChartData(timeFrame: string, symbol: string): Observable<ChartPoint[]> {



    if (environment.FinDataApiKey === undefined) {
      return super.getChartData(timeFrame, symbol);
    } else {


      let ChartDataReq: HttpRequest<any>;
      let currentDate = new Date();
      switch (timeFrame) {
        case "1D":
          ChartDataReq = new HttpRequest("GET", environment.FinDataApi + 'historical-chart/1min/' + symbol);
          break;
        default:
          ChartDataReq = new HttpRequest("GET", environment.FinDataApi + 'historical-price-full/' + symbol);
          switch (timeFrame) {
            case "1M":
              ChartDataReq = ChartDataReq.clone({
                setParams: {
                  from: this.getStartDate(30),
                  to: this.datePipe.transform(currentDate, 'yyyy-MM-dd'),
                }
              })
              break;
            case "6M":
              ChartDataReq = ChartDataReq.clone({
                setParams: {
                  from: this.getStartDate(180),
                  to: this.datePipe.transform(currentDate, 'yyyy-MM-dd'),
                }
              })
              break;
            case "YTD":
              ChartDataReq = ChartDataReq.clone({
                setParams: {
                  from: this.datePipe.transform(new Date(currentDate.getFullYear(), 0, 1), 'yyyy-MM-dd'),
                  to: this.datePipe.transform(currentDate, 'yyyy-MM-dd'),
                }
              })
              break;
            case "1Y":
              ChartDataReq = ChartDataReq.clone({
                setParams: {
                  from: this.getStartDate(365),
                  to: this.datePipe.transform(currentDate, 'yyyy-MM-dd'),
                }
              })
              break;
            case "5Y":
              ChartDataReq = ChartDataReq.clone({
                setParams: {
                  from: this.getStartDate(1825),
                  to: this.datePipe.transform(currentDate, 'yyyy-MM-dd'),
                }
              })
              break;
            default:
              ChartDataReq = null;
              break;
          }
          break;
      }

      switch (timeFrame) {
        case "1D":
          return this.cacheTransactionsService.getCacheable<ChartPoint[]>(
            ChartDataReq.urlWithParams, 60000)
            .pipe(
              map(value => {
                let chartData: ChartPoint[] = [];
                value.map(val => {
                  chartData.push(this.chartPointAdapter.adapt(val))
                })
                return chartData;
              }))
          break;
        default:
          return this.cacheTransactionsService.getCacheable<ChartPoint[]>(
            ChartDataReq.urlWithParams, 60000)
            .pipe(
              map(value => {
                let chartData: ChartPoint[] = [];
                value = value['historical'];
                value.map(val => {
                  val.date = new Date(val.date.toString().split("T")[0] + " 0:0:0.0")
                  chartData.push(this.chartPointAdapter.adapt(val))
                })
                return chartData;
              })
            )
          break;
      }
    }
  }
  // get start dates from intervals larger than 1 day
  private getStartDate(interval: number) {
    let currentDate = new Date();
    return this.datePipe.transform(new Date(currentDate.setDate(currentDate.getDate() - interval)), 'yyyy-MM-dd');
  }

}
