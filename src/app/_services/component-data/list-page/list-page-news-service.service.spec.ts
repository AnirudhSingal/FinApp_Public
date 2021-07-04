import { TestBed } from '@angular/core/testing';

import { ListPageNewsServiceService } from './list-page-news-service.service';

describe('ListPageNewsServiceService', () => {
  let service: ListPageNewsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPageNewsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
