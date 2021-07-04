import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPriceTickerComponent } from './stock-price-ticker.component';

describe('StockPriceTickerComponent', () => {
  let component: StockPriceTickerComponent;
  let fixture: ComponentFixture<StockPriceTickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockPriceTickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPriceTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
