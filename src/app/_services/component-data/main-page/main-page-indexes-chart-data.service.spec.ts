import { TestBed } from '@angular/core/testing';

import { MainPageIndexesChartDataService } from './main-page-indexes-chart-data.service';

describe('MainPageIndexesChartDataService', () => {
  let service: MainPageIndexesChartDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainPageIndexesChartDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
