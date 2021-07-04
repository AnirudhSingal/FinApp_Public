import { TestBed } from '@angular/core/testing';

import { MainPageStocksListDataService } from './main-page-stocks-list-data.service';

describe('MainPageStocksListDataService', () => {
  let service: MainPageStocksListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainPageStocksListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
