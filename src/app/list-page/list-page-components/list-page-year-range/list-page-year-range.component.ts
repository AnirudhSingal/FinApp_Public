import { Component, OnInit, Input, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { ListPageYearRangeD3Service } from './list-page-year-range-d3.service';
import { GlobalIdCounterService } from 'src/app/_services/utilities/global-id-counter.service';

@Component({
  selector: 'app-list-page-year-range',
  templateUrl: './list-page-year-range.component.html',
  styleUrls: ['./list-page-year-range.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ListPageYearRangeComponent implements AfterViewInit, OnInit {
  rangeSvg: any;
  svgId: string= "year-range-" + this.uniqueId.getUniqueId();
  svgIdSelector : string = "#"+ this.svgId;
  constructor(
    private d3Service : ListPageYearRangeD3Service,
    private uniqueId: GlobalIdCounterService
  ) { }

  
  @Input() symbol: string
  @Input() dayHigh: number
  @Input() price: number
  @Input() dayLow: number
  @Input() yearHigh: number
  @Input() yearLow: number
  
  ngOnInit(): void {
    // this.svgId = "#year-range-" + this.uniqueId.getUniqueId();
  }

  ngAfterViewInit(): void {
    this.rangeSvg = this.d3Service.createSvg(this.svgIdSelector);
    this.d3Service.drawRangePlot(this.rangeSvg, 200,20,this.price, this.dayHigh, this.dayLow, this.yearHigh, this.yearLow)
    this.d3Service.responsivefy(this.svgIdSelector + " svg", 200,20);
  }
}