import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoCurrencyListComponent } from './crypto-currency-list.component';

describe('CryptoCurrencyListComponent', () => {
  let component: CryptoCurrencyListComponent;
  let fixture: ComponentFixture<CryptoCurrencyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoCurrencyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoCurrencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
