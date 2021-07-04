import { TestBed } from '@angular/core/testing';

import { MainPageSymbolListDataService } from './main-page-symbol-list-data.service';

describe('MainPageSymbolListDataService', () => {
  let service: MainPageSymbolListDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainPageSymbolListDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
