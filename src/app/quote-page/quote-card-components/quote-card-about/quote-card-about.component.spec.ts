import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCardAboutComponent } from './quote-card-about.component';

describe('QuoteCardAboutComponent', () => {
  let component: QuoteCardAboutComponent;
  let fixture: ComponentFixture<QuoteCardAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteCardAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCardAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
