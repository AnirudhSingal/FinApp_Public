import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockPriceTickerComponent } from './stock-price-ticker.component';
import { StockPriceTickerElementComponent } from './stock-price-ticker-element/stock-price-ticker-element.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [
    StockPriceTickerComponent,
    StockPriceTickerElementComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports:[
    StockPriceTickerComponent,
  ],  
  bootstrap:[StockPriceTickerComponent]
})
export class StockPriceTickerModule { }
