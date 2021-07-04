import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPriceTickerElementComponent } from './stock-price-ticker-element.component';

describe('StockPriceTickerElementComponent', () => {
  let component: StockPriceTickerElementComponent;
  let fixture: ComponentFixture<StockPriceTickerElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockPriceTickerElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPriceTickerElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
