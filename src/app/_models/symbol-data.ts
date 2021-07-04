import { Adapter } from './adapter';

export class SymbolData{
    constructor(
        public exchange: string,
        public name: string,
        public price: number,
        public symbol: string
    ){}
}​

export class SymbolDataAdapter implements Adapter<SymbolData>{
    adapt(item: any): SymbolData {
        return new SymbolData(
            item.exchange, 
            item.name, 
            item.price, 
            item.symbol
        );
    }
}