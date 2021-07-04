import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCardDataboxComponent } from './quote-card-databox.component';

describe('QuoteCardDataboxComponent', () => {
  let component: QuoteCardDataboxComponent;
  let fixture: ComponentFixture<QuoteCardDataboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteCardDataboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCardDataboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
