import { TestBed } from '@angular/core/testing';

import { CurrencyListDataService } from './currency-list-data.service';

describe('CurrencyListDataService', () => {
  let service: CurrencyListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
