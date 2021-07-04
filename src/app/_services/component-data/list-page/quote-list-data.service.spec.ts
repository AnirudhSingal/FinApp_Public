import { TestBed } from '@angular/core/testing';

import { QuoteListDataService } from './quote-list-data.service';

describe('QuoteListDataService', () => {
  let service: QuoteListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuoteListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
