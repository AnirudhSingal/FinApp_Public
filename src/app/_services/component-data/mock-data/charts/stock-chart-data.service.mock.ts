import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ChartPoint, ChartPointAdapter } from 'src/app/_models/chart-point';
import { STOCK_CHART_DATA } from './data/stock-chart-data';

@Injectable({
  providedIn: 'root'
})

export class StockChartDataServiceMock {

  constructor(
    protected chartPointAdapter: ChartPointAdapter,
  ) {  }

  // Get, clean and sort data
  public getChartData(timeFrame: string, symbol: string): Observable<ChartPoint[]>  {
    let keyData = STOCK_CHART_DATA.find(el => el.symbol === symbol)[timeFrame];
    keyData = keyData.map(el => this.chartPointAdapter.adapt(el));
    return of(keyData);
  }
}