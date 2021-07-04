import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageListComponent } from './list-page-list.component';

describe('ListPageListComponent', () => {
  let component: ListPageListComponent;
  let fixture: ComponentFixture<ListPageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
