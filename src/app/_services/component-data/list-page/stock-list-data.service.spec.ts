import { TestBed } from '@angular/core/testing';

import { StockListDataService } from './stock-list-data.service';

describe('StockListDataService', () => {
  let service: StockListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
