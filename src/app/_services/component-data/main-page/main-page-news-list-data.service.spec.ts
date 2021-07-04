import { TestBed } from '@angular/core/testing';

import { MainPageNewsListDataService } from './main-page-news-list-data.service';

describe('MainPageNewsListDataService', () => {
  let service: MainPageNewsListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainPageNewsListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
