import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCartDetailedChartComponent } from './quote-cart-detailed-chart.component';

describe('QuoteCartDetailedChartComponent', () => {
  let component: QuoteCartDetailedChartComponent;
  let fixture: ComponentFixture<QuoteCartDetailedChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteCartDetailedChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCartDetailedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
