import { TestBed } from '@angular/core/testing';

import { QouteCardKeyStatsDataService } from './qoute-card-key-stats-data.service';

describe('QouteCardKeyStatsDataService', () => {
  let service: QouteCardKeyStatsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QouteCardKeyStatsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
