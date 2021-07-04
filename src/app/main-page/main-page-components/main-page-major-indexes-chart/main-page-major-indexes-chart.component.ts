import { Component, OnInit, Input, AfterViewInit, ViewEncapsulation, HostListener, ElementRef, AfterContentInit } from '@angular/core';
import { MainPageIndexesChartD3ServiceService } from './main-page-indexes-chart-d3-service.service';
import { BehaviorSubject, of } from 'rxjs';
import { ChartPoint } from 'src/app/_models/chart-point';
import { MainPageIndexesChartDataService } from 'src/app/_services/component-data/main-page/main-page-indexes-chart-data.service';

@Component({
  selector: 'app-main-page-major-indexes-chart',
  templateUrl: './main-page-major-indexes-chart.component.html',
  styleUrls: ['./main-page-major-indexes-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainPageMajorIndexesChartComponent implements OnInit, AfterViewInit {
  @Input() public isContinuous: boolean;
  @Input() public idValue: string;
  @Input() public symbolValue: string;

  previousClose: number;
  openPrice: number;
  closePrice: number;
  chartData: ChartPoint[];
  isDataLoaded: boolean = false;
  isDataLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false) ;
  symbolName: string;
  changesPercentage: any;
  change: any;

  figureId:string;

  private width = 300
  private pricePlotHeight = 100;

  private chartSvg

  constructor(
    private d3Service: MainPageIndexesChartD3ServiceService,
    private el: ElementRef,
    private chartDataService: MainPageIndexesChartDataService
  ) { }

  ngOnInit(): void {
    this.figureId = 'major-index-plot-' + this.idValue;
    this.chartDataService.getData(this.symbolValue).subscribe(_ => {
      this.chartData = _.chartData;
      this.previousClose = _.dataPoints.previousClose;
      this.openPrice = _.dataPoints.open;
      this.closePrice = _.dataPoints.price;
      this.symbolName = _.dataPoints.name;
      this.changesPercentage = _.dataPoints.changesPercentage;
      this.change = _.dataPoints.change;
      this.chartSvg = this.d3Service.createSvg(0, 0, "figure#" + this.figureId);
      this.isDataLoaded$.next(true);
    })
  }


  @HostListener("window:resize", [])
  private onResize() {
    if (this.el.nativeElement.offsetWidth % 200 == 0) {
      this.d3Service.responsivefy("figure#" + this.figureId + " svg", 300, 100);
    }
  }

  ngAfterViewInit(): void {
    this.isDataLoaded$.subscribe(_ => {
      if(_){
        this.isDataLoaded = true;
        this.chartSvg = this.d3Service.createSvg(0, 0, "figure#" + this.figureId);
  
        // draw plot
        this.d3Service.drawPlot( this.figureId,
          this.isContinuous, of(this.chartData), this.idValue, this.chartSvg, this.width,
          this.pricePlotHeight, this.previousClose, this.openPrice, this.closePrice
        );
        this.d3Service.responsivefy("figure#" + this.figureId + " svg", 300, 100);
      }
    })
  }
  ngAfterViewChecked(): void {
    this.d3Service.responsivefy("figure#" + this.figureId + " svg", 300, 100);
  }
}