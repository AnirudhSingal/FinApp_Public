import { TestBed } from '@angular/core/testing';

import { CacheTransactionsService } from './cache-transactions.service';

describe('CacheTransactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CacheTransactionsService = TestBed.get(CacheTransactionsService);
    expect(service).toBeTruthy();
  });
});
