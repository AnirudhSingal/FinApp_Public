import { Component, OnInit, ElementRef ,AfterViewInit,ViewChild } from '@angular/core';

@Component({
  selector: 'app-stock-price-ticker',
  templateUrl: './stock-price-ticker.component.html',
  styleUrls: ['./stock-price-ticker.component.css'] ,
})
export class StockPriceTickerComponent implements AfterViewInit{

  @ViewChild("tickerListComponent", {read:ElementRef, static: false})
  component: ElementRef;

  isDataLoaded:boolean = false;

  symbolList = ["FB", "AAPL", "AMZN", "TSLA", "GOOGL"];

  ngAfterViewInit(): void {
    // let notLoadedElementWidth = document.querySelector('.stock-element').clientWidth
    let notLoadedElementWidth = 0 
    let isWidthSet = false;
    let notLoadedElements = [];  

    const refreshInterval = setInterval(()=>{
      if(!isWidthSet){
        notLoadedElements = [];
        let elements = document.querySelectorAll('.stock-element')
        elements.forEach(element => {
          
          // if the elements width is zero push it to notLoadedElements array. when this arrays size is 0, consider the ticker loaded
          if(element.clientWidth === notLoadedElementWidth ){
            notLoadedElements.push(element)
          }
        });
        if(notLoadedElements.length == 0){
          isWidthSet = true
        }
      }else{
        clearInterval(refreshInterval)
        let width = this.component.nativeElement.offsetWidth;
        let repeat = Math.ceil(window.innerWidth/width)

        // clone the ticker relevant number of times to give the illusion of it being continuous
        for (let index = 0; index < repeat; index++) {
          let ticker = document.querySelector('.ticker')
          let list = document.querySelector('.ticker__list')
          let clone = list.cloneNode(true);
          ticker.append(clone);
        }
        // add animation to the ticker after its loaded
        let animName = "ticker",
          animDuration =  (25/repeat).toString() + "s"  ,
          animDelay = "0.5s",
          animIterationCount = "infinite",
          animTiming = "linear";

        let listAll = document.querySelectorAll('.ticker__list')
        listAll.forEach(element => {
          let el = <HTMLElement> element;
          el.style["animation"] = animName + " " + animDuration + " " + animDelay + " " + animIterationCount + " " + animTiming  
        });
        let body = <HTMLElement>document.querySelector('.ticker')
        let skeleton = <HTMLElement>document.querySelector('.ticker-skeleton');
        skeleton.style.display = 'none';
        body.style.display = ''
      }
    }, 10)
  }
}
