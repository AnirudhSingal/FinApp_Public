import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export class KeyStatsData{
    
    constructor(

        public name: string,
        public marketCap : number,
        public eps :number,
        public sharesOutstanding: number,
        public peRatioTTM:number,
        public priceToBookRatioTTM :number,
        public priceToSalesRatioTTM :number,
        public lastDividendReported: number,
        public ebitdaratio: number,
    ) {}


    // marketCap	/api/v3/quote/ 	marketCap
    // EPS	/api/v3/quote/ 	eps
    // Shares Outstanding	/api/v3/quote/ 	sharesOutstanding
    // P/E Ratio	api/v3/ratios-ttm/	peRatioTTM
    // Price to Book Ratio	api/v3/ratios-ttm/	priceToBookRatioTTM
    // Price to Sales Ratio	api/v3/ratios-ttm/	priceToSalesRatioTTM
    // Last Dividend Reported	/api/v3/historical-price-full/stock_dividend/	historical[0].dividend
    // ebitdaratio	api/v3/income-sxtatement/	ebitdaratio
            
    // PEGY Ratio		
    // 1 Year Return		
    // 30 Day Avg Volume		
    // Dividend		
    


}

@Injectable({
    providedIn: "root",
})
export class KeyStatsDataAdapter implements Adapter<KeyStatsData>{
        adapt(item:any): KeyStatsData {
        return new KeyStatsData(
            item.name,
            item.marketCap, 
            item.eps,
            item.sharesOutstanding, 
            item.peRatioTTM, 
            item.priceToBookRatioTTM,
            item.priceToSalesRatioTTM,
            item.lastDividendReported,
            item.ebitdaratio,
        );
    }
}