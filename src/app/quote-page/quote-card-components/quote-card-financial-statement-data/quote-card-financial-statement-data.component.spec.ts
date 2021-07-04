import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCardFinancialStatementDataComponent } from './quote-card-financial-statement-data.component';

describe('QuoteCardFinancialStatementDataComponent', () => {
  let component: QuoteCardFinancialStatementDataComponent;
  let fixture: ComponentFixture<QuoteCardFinancialStatementDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteCardFinancialStatementDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCardFinancialStatementDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
