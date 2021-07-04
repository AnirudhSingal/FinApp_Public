import { TestBed } from '@angular/core/testing';

import { MainPageCryptocurrencyListDataService } from './main-page-cryptocurrency-list-data.service';

describe('MainPageCryptocurrencyListDataService', () => {
  let service: MainPageCryptocurrencyListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainPageCryptocurrencyListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
