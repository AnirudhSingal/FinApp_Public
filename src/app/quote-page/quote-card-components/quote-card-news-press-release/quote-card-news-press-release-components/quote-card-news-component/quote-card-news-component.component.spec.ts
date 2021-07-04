import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteCardNewsComponentComponent } from './quote-card-news-component.component';

describe('QuoteCardNewsComponentComponent', () => {
  let component: QuoteCardNewsComponentComponent;
  let fixture: ComponentFixture<QuoteCardNewsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteCardNewsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteCardNewsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
