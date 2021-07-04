import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageYearRangeComponent } from './list-page-year-range.component';

describe('ListPageYearRangeComponent', () => {
  let component: ListPageYearRangeComponent;
  let fixture: ComponentFixture<ListPageYearRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPageYearRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPageYearRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
