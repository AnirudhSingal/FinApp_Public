import { Adapter } from '../adapter';
import { Injectable } from '@angular/core';

export class CryptoCurrencyListData{
        
    constructor(
        public symbol: string,
        public name: string, 
        public price: number,
        public open: number,
        public changesPercentage: number,
        public change: number,
        public dayLow: number,
        public dayHigh: number,
        public yearHigh: number,
        public yearLow: number,
        public previousClose: number,
        public timestamp: number,
        public volume: number,
        public marketCap: number,
        public avgVolume: number,
        public pe : number
    ) {}

    // priceAvg50?: number;
    // priceAvg200?: number;
    // exhange?: string;
}

@Injectable({
    providedIn: "root",
})
export class CryptoCurrencyListDataAdapter implements Adapter<CryptoCurrencyListData>{
    adapt(item: any): CryptoCurrencyListData {
        return new CryptoCurrencyListData(
            item.symbol, 
            item.name,
            item.price, 
            item.open, 
            item.changesPercentage, 
            item.change, 
            item.dayLow, 
            item.dayHigh,
            item.yearHigh,
            item.yearLow,
            item.previousClose,
            item.timestamp,
            item.volume,
            item.marketCap,
            item.avgVolume,
            item.pe
        );
    }
}