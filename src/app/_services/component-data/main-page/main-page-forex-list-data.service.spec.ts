import { TestBed } from '@angular/core/testing';

import { MainPageForexListDataService } from './main-page-forex-list-data.service';

describe('MainPageForexListDataService', () => {
  let service: MainPageForexListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainPageForexListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
