import { TestBed } from '@angular/core/testing';

import { MainPageIndexesChartD3ServiceService } from './main-page-indexes-chart-d3-service.service';

describe('MainPageIndexesChartD3ServiceService', () => {
  let service: MainPageIndexesChartD3ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainPageIndexesChartD3ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
