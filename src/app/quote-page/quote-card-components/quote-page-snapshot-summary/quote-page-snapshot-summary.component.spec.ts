import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotePageSnapshotSummaryComponent } from './quote-page-snapshot-summary.component';

describe('QuotePageSnapshotSummaryComponent', () => {
  let component: QuotePageSnapshotSummaryComponent;
  let fixture: ComponentFixture<QuotePageSnapshotSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotePageSnapshotSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotePageSnapshotSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
