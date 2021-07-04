import { TestBed } from '@angular/core/testing';

import { QuoteCardNewsPressReleaseDataService } from './quote-card-news-press-release-data.service';

describe('QuoteCardNewsPressReleaseDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuoteCardNewsPressReleaseDataService = TestBed.get(QuoteCardNewsPressReleaseDataService);
    expect(service).toBeTruthy();
  });
});
