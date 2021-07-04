import { TestBed } from '@angular/core/testing';

import { StockChartDataService } from './stock-chart-data.service';

describe('QuoteCardChartDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockChartDataService = TestBed.get(StockChartDataService);
    expect(service).toBeTruthy();
  });
});
