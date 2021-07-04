import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageNewsListComponent } from './main-page-news-list.component';

describe('MainPageNewsListComponent', () => {
  let component: MainPageNewsListComponent;
  let fixture: ComponentFixture<MainPageNewsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageNewsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
