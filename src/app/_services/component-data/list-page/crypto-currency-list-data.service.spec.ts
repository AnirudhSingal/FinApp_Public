import { TestBed } from '@angular/core/testing';

import { CryptoCurrencyListDataService } from './crypto-currency-list-data.service';

describe('CryptoCurrencyListDataService', () => {
  let service: CryptoCurrencyListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoCurrencyListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
