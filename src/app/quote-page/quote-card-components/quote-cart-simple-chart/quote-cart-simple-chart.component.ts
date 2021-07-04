import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, AfterViewInit, AfterViewChecked, DoCheck, OnChanges, SimpleChanges, ElementRef, HostListener } from '@angular/core';
import {  of } from 'rxjs';
import { D3Service } from 'src/app/_services/d3.service';
import { ChartTimeframes } from '../chart-timeframes';
import {faExpandAlt, IconDefinition, } from '@fortawesome/free-solid-svg-icons'
import { StockChartDataService } from 'src/app/_services/component-data/charts/stock-chart-data.service';

@Component({
  selector: 'app-quote-cart-simple-chart',
  templateUrl: './quote-cart-simple-chart.component.html',
  styleUrls: ['./quote-cart-simple-chart.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class QuoteCartSimpleChartComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @Input() public symbol: string;
  @Input() public previousClose: number;
  @Input() public openPrice: number;
  @Input() public closePrice: number;
  @Input() public idValue: number;
  @Output() public closed =  new EventEmitter();

  expandIcon :IconDefinition;
  isDataLoaded: boolean = false;
  constructor(
    private d3Service: D3Service,
    private quoteCartChartDataService: StockChartDataService,
    private el: ElementRef
  ) { }
  

@HostListener("window:resize",[])
private onResize(){
  if(this.el.nativeElement.offsetWidth % 200 == 0){
      this.d3Service.responsivefy("figure#simple-Price-Plot-" + this.idValue + " svg", 350, 220);
    }
  }

  ngAfterViewChecked(): void {
    this.d3Service.responsivefy("figure#simple-Price-Plot-" + this.idValue + " svg", 350, 220);
  }
  
  
  ngAfterViewInit(): void {


    document.getElementById('simple-Price-Plot-' + this.idValue).style.display = 'none';

    this.quoteCartChartDataService.getChartData(ChartTimeframes.day, this.symbol)
    .subscribe(data =>{
      this.isDataLoaded = true;
      document.getElementById('simple-Price-Plot-' + this.idValue).style.display = '';

      this.priceSvg = this.d3Service.createSvg(0,0, "figure#simple-Price-Plot-" + this.idValue);
      // draw 1 day plot by default
      this.d3Service.drawStockPlotSimple(ChartTimeframes.day,
        of(data),
        this.priceSvg,
        this.width, this.pricePlotHeight, 
        this.previousClose, this.openPrice, this.closePrice

      );
    })

  }
  
  private priceSvg;
  private margin = 40;
  private width = 300
  private pricePlotHeight = 200;
  
  ngOnInit() {
    this.expandIcon = faExpandAlt
  }
  
  ChangeTimeFrame(value) {
    
    document.getElementById('simple-Price-Plot-' + this.idValue).style.display = 'none';
    this.isDataLoaded = false;

    this.quoteCartChartDataService.getChartData(value, this.symbol).subscribe(data => {



      document.getElementById('simple-Price-Plot-' + this.idValue).style.display = '';
      this.isDataLoaded = true;
      this.d3Service.drawStockPlotSimple(value,
        of(data),
        this.priceSvg,
        this.width, this.pricePlotHeight,
        this.previousClose, this.openPrice, this.closePrice
      );
    })    
  }

  hideFigure(){
    this.closed.emit();
  }
}
