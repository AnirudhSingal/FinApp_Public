import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCartSimpleChartComponent } from './quote-cart-simple-chart.component';

describe('QuoteCartSimpleChartComponent', () => {
  let component: QuoteCartSimpleChartComponent;
  let fixture: ComponentFixture<QuoteCartSimpleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteCartSimpleChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCartSimpleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
