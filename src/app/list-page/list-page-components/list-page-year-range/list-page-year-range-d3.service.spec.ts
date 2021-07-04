import { TestBed } from '@angular/core/testing';

import { ListPageYearRangeD3Service } from './list-page-year-range-d3.service';

describe('ListPageYearRangeD3Service', () => {
  let service: ListPageYearRangeD3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPageYearRangeD3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
