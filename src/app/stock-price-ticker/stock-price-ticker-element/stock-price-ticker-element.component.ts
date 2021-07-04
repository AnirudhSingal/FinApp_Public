import { Component, OnInit, Input, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { QuoteData } from 'src/app/_models/quote-data';
import { map } from 'rxjs/operators';
import { QuoteDataService } from 'src/app/_services/component-data/quote-card/quote-data.service';

@Component({
  selector: 'app-stock-price-ticker-element',
  templateUrl: './stock-price-ticker-element.component.html',
  styleUrls: ['./stock-price-ticker-element.component.css']
})
export class StockPriceTickerElementComponent implements OnInit {

  faCaretUp: IconDefinition =  faCaretUp;
  faCaretDown: IconDefinition =  faCaretDown;
  price : string;
  name: string;
  change : string;
  changePercentage : string;

  @Input() 
  public symbol : string
  
  @ViewChild("changeIcon", {read: ElementRef, static: false})
  changeIcon : ElementRef

  @ViewChildren ("tickerColor", {read: ElementRef })
  tickerColorElementList : QueryList<ElementRef>
  quoteData$: Observable<QuoteData>;

  constructor(
    private quoteData: QuoteDataService
  ) { }

  ngOnInit() {

    this.quoteData$ = this.quoteData.getQuoteData(this.symbol).pipe(
      map(quoteDataArray => {
        return quoteDataArray[0]
      })
    );

    // this.quoteData.getQuoteData(this.symbol).subscribe(quoteDataArray=>{
    //   let quoteData = quoteDataArray[0]
    //   this.name = quoteData.name;
    //   this.price = quoteData.price.toFixed(2)
    //   this.price = quoteData.price.toFixed(2)
    //   this.change = quoteData.change.toFixed(2)
    //   this.changePercentage = quoteData.changesPercentage.toFixed(2) + "%"
    //   if(quoteData.change < 0){
    //     this.faIcon = faCaretDown
    //     this.changeIcon.nativeElement.classList.add('dark-negative-color');
    //     this.tickerColorElementList.forEach(tickerColorElement =>{
    //       tickerColorElement.nativeElement.classList.add("tickerColorNegative")
    //     })  
    //   }else{
    //     this.faIcon = faCaretUp
    //     this.changeIcon.nativeElement.classList.add('dark-positive-color');
    //     this.tickerColorElementList.forEach(tickerColorElement =>{
    //       tickerColorElement.nativeElement.classList.add("tickerColorPositive")
    //     })
    //   }
    // });
  }
}