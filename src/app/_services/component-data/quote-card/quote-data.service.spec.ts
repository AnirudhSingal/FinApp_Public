import { TestBed } from '@angular/core/testing';

import { QuoteDataService } from './quote-data.service';

describe('QuoteDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuoteDataService = TestBed.get(QuoteDataService);
    expect(service).toBeTruthy();
  });
});
