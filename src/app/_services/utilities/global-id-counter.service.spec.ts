import { TestBed } from '@angular/core/testing';

import { GlobalIdCounterService } from './global-id-counter.service';

describe('GlobalIdCounterService', () => {
  let service: GlobalIdCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalIdCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
