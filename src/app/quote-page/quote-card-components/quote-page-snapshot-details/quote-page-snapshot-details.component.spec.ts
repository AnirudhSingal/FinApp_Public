import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotePageSnapshotDetailsComponent } from './quote-page-snapshot-details.component';

describe('QuotePageSnapshotDetailsComponent', () => {
  let component: QuotePageSnapshotDetailsComponent;
  let fixture: ComponentFixture<QuotePageSnapshotDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotePageSnapshotDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotePageSnapshotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
