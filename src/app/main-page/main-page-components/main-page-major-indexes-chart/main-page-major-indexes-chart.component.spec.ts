import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageMajorIndexesChartComponent } from './main-page-major-indexes-chart.component';

describe('MainPageMajorIndexesChartComponent', () => {
  let component: MainPageMajorIndexesChartComponent;
  let fixture: ComponentFixture<MainPageMajorIndexesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPageMajorIndexesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageMajorIndexesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
