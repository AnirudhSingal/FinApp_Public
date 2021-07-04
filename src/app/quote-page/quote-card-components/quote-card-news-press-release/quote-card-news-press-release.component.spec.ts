import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCardNewsPressReleaseComponent } from './quote-card-news-press-release.component';

describe('QuoteCardNewsPressReleaseComponent', () => {
  let component: QuoteCardNewsPressReleaseComponent;
  let fixture: ComponentFixture<QuoteCardNewsPressReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteCardNewsPressReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCardNewsPressReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
