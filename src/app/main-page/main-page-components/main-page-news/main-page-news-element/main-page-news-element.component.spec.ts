import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageNewsElementComponent } from './main-page-news-element.component';

describe('MainPageNewsElementComponent', () => {
  let component: MainPageNewsElementComponent;
  let fixture: ComponentFixture<MainPageNewsElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageNewsElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageNewsElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
