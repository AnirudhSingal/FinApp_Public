import { Component, OnInit, DoCheck, Input, ViewEncapsulation, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { D3Service } from 'src/app/_services/d3.service';
import { ChartTimeframes } from '../chart-timeframes';
import { faCompressAlt, IconDefinition, } from '@fortawesome/free-solid-svg-icons'
import { StockChartDataService } from 'src/app/_services/component-data/charts/stock-chart-data.service';
import { ChartPoint } from 'src/app/_models/chart-point';

@Component({
  selector: 'app-quote-cart-detailed-chart',
  templateUrl: './quote-cart-detailed-chart.component.html',
  styleUrls: ['./quote-cart-detailed-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QuoteCartDetailedChartComponent implements OnInit, DoCheck {
  @Input() public symbol: string;
  @Input() public previousClose: number;
  @Input() public openPrice: number;
  @Input() public closePrice: number;
  @Output() public closed = new EventEmitter();

  compressIcon: IconDefinition;

  isVisible: boolean;
  isDataLoaded: boolean = false;
  chartData: ChartPoint[];
  elementHeight: any;

  constructor(
    private d3Service: D3Service,
    private quoteCartChartDataService: StockChartDataService,
    private el: ElementRef
  ) { }

  private priceSvg;
  private margin = 40;
  private width = 700;
  private pricePlotHeight = 200;
  private volumePlotHeight = 100;

  ngOnInit() {

    this.compressIcon = faCompressAlt;

    document.getElementById('detailed-Price-Plot').style.display = 'none';
    this.quoteCartChartDataService.getChartData(ChartTimeframes.day, this.symbol).subscribe(data => {
      this.chartData = data;
      this.isDataLoaded = true;
      document.getElementById('detailed-Price-Plot').style.display = '';
      this.priceSvg = this.d3Service.createSvg(0, 50, "figure#detailed-Price-Plot");
      // draw 1 day plot by default
      this.d3Service.drawStockPlotDetailed("1D",
        of(this.chartData),
        this.priceSvg,
        this.width, this.pricePlotHeight, this.volumePlotHeight,
        this.previousClose, this.openPrice, this.closePrice
      );
    })
  }

  ngDoCheck(): void {
    this.d3Service.responsivefy("figure#detailed-Price-Plot svg", 750, 400);
    this.elementHeight = this.el.nativeElement.offsetHeight;
  }

  ChangeTimeFrame(value) {
    this.isDataLoaded = false;
    document.getElementById('detailed-Price-Plot').style.display = 'none';
    this.quoteCartChartDataService.getChartData(value, this.symbol).subscribe(data => {
      this.isDataLoaded = true;
      document.getElementById('detailed-Price-Plot').style.display = '';
      this.d3Service.drawStockPlotDetailed(value,
        of(data),
        this.priceSvg,
        this.width, this.pricePlotHeight, this.volumePlotHeight,
        this.previousClose, this.openPrice, this.closePrice
      );
    })

  }

  hideFigure() {
    this.closed.emit();
  }
}