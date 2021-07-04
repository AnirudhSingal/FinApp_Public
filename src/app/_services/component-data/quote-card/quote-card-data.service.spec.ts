import { TestBed } from '@angular/core/testing';

import { QuoteCardDataService } from './quote-card-data.service';

describe('QuoteCardDataService', () => {
  let service: QuoteCardDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteCardDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
