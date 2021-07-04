import { Injectable } from '@angular/core';
import { QuoteAdapter } from 'src/app/_models/quote-data';
import { Observable, of } from 'rxjs';
import { CHART_DATA } from './data/indexes-chart-data';
import { map } from 'rxjs/operators';
import { ChartPointAdapter } from 'src/app/_models/chart-point';

@Injectable({
  providedIn: 'root'
})
export class MainPageIndexesChartDataServiceMock {

  constructor(
    protected chartPointAdapter: ChartPointAdapter
  ) { }


  getData(symbolValue: string): Observable<any> {

    const data = CHART_DATA.find(el => el.symbol === symbolValue).data;
    return of(data).pipe(map(dataArray =>{
      let chartData = dataArray.chartData.map(el => this.chartPointAdapter.adapt(el))
      let dataPoints = dataArray.dataPoints;
      return {
        "chartData" : chartData,
        "dataPoints" : dataPoints
      }
    }))
  }
}