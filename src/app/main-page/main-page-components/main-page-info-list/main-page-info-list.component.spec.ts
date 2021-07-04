import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageInfoListComponent } from './main-page-info-list.component';

describe('MainPageInfoListComponent', () => {
  let component: MainPageInfoListComponent;
  let fixture: ComponentFixture<MainPageInfoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageInfoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
