import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCardPressReleaseComponentComponent } from './quote-card-press-release-component.component';

describe('QuoteCardPressReleaseComponentComponent', () => {
  let component: QuoteCardPressReleaseComponentComponent;
  let fixture: ComponentFixture<QuoteCardPressReleaseComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteCardPressReleaseComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCardPressReleaseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
