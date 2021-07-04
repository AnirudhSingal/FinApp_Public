import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCardKeyStatisticsComponent } from './quote-card-key-statistics.component';

describe('QuoteCardKeyStatisticsComponent', () => {
  let component: QuoteCardKeyStatisticsComponent;
  let fixture: ComponentFixture<QuoteCardKeyStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteCardKeyStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCardKeyStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
