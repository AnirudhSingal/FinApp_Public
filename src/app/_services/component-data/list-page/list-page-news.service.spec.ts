import { TestBed } from '@angular/core/testing';

import { ListPageNewsService } from './list-page-news.service';

describe('ListPageNewsService', () => {
  let service: ListPageNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPageNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
