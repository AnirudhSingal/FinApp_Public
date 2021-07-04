import { AfterViewInit, Component, Input, OnInit, ViewEncapsulation,  } from '@angular/core';
import { QuoteCardDataboxD3ServiceService } from './quote-card-databox-d3-service.service';

@Component({
  selector: 'app-quote-card-databox',
  templateUrl: './quote-card-databox.component.html',
  styleUrls: ['./quote-card-databox.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class QuoteCardDataboxComponent implements AfterViewInit {

  @Input() public heading:string
  @Input() public value:string
  @Input() public isRange?:boolean = false;
  @Input() public upperLimit?:number
  @Input() public lowerLimit?:number
  @Input() public figureId?:string
  @Input() public isLink?:boolean = false;
  


  private rangeSvg;

  constructor(
    private d3Service: QuoteCardDataboxD3ServiceService,
  ) { }

  ngAfterViewInit(): void {
    if(this.isRange){
      this.rangeSvg = this.d3Service.createSvg("div#" + this.figureId);
      this.d3Service.drawRangePlot(this.rangeSvg, 100,20,parseFloat(this.value), this.upperLimit, this.lowerLimit)
      this.d3Service.responsivefy("div#" + this.figureId + " svg", 100,20);
    }
  }

  redirectToLink(url: string){
    window.location.href = url;
  }
}
