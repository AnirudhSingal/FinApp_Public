import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageNewsListComponent } from './list-page-news-list.component';

describe('ListPageNewsListComponent', () => {
  let component: ListPageNewsListComponent;
  let fixture: ComponentFixture<ListPageNewsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPageNewsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPageNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
