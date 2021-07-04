export class QuoteCardData{
    constructor(

        // quote
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
        
        
        //profile
        public companyName:string,
        public image: string,
        public currency: string,
        public country: string,
        public exchangeShortName: string,
        public industry: string,
        public website: string,
        public description: string,
        public ceo: string,
        public sector: string,
        public fullTimeEmployees: string,
        public phone: string,
        public address: string,
        public city: string,
        public state: string,
        public zip: string,
    ) {}
}
