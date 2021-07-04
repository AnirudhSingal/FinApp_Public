import { Adapter } from './adapter';

export class MainPageInfoListElementData {
    constructor(
        public ticker: string,
        public price?: string,
        public changesPercentage?: string,
        public changes?: string,
        public companyName?: string,
    ) { }
}

export class MainPageInfoCryptocurrencyListElementDataAdapter implements Adapter<MainPageInfoListElementData>{
    adapt(item: any): MainPageInfoListElementData {

        let ticker = item?.['symbol'];

        let price = parseFloat(item?.['price']).toString();


        let changesPercentage: any;
        let changes: any;

        if (item?.['change'] === undefined) {
            changesPercentage = undefined;
            changes = undefined;
        } else {
            changesPercentage = (parseFloat(item?.['change']) > 0 ? '+' : '') +
                item?.['changesPercentage']?.toString();
            changes = (parseFloat(item?.['change']) > 0 ? '+' : '') + item?.['change']?.toString();
        }

        let companyName = item?.['name'];

        return new MainPageInfoListElementData(
            ticker,
            price,
            changesPercentage,
            changes,
            companyName
        );
    }
}

export class MainPageInfoForexListElementDataAdapter implements Adapter<MainPageInfoListElementData>{
    adapt(item: any): MainPageInfoListElementData {


        let price = parseFloat(item?.['bid']).toString();
        let changes = item?.['changes'];
        let companyName = item?.['ticker'];
        let ticker = item?.['ticker'];

        let changesPercentage: any;

        if (item?.['change'] === undefined) {
            changesPercentage = undefined;
            changes = undefined;
        } else {
            changesPercentage = (parseFloat(item?.['change']) > 0 ? '+' : '') +
                item?.['changesPercentage']?.toString();
            changes = (parseFloat(item?.['change']) > 0 ? '+' : '') + item?.['change']?.toString();
        }



        let changesPercentageNumber = ((parseFloat(item?.['bid']) - parseFloat(item?.['open'])) * 100 / parseFloat(item?.['open']));

        if (isNaN(changesPercentageNumber) || isNaN(parseFloat(item['changes']))) {
            changesPercentage = null;
        } else {
            changesPercentage = (parseFloat(item['changes']) > 0 ? '+' : '') + changesPercentageNumber.toString();
        }

        return new MainPageInfoListElementData(
            ticker,
            price,
            changesPercentage,
            changes,
            companyName
        );
    }
}

export class MainPageInfoStockListElementDataAdapter implements Adapter<MainPageInfoListElementData>{
    adapt(item: any): MainPageInfoListElementData {

        let companyName = item?.['companyName'];
        let price = parseFloat(item?.['price']).toFixed(2);
        let changes = item?.['changes'];
        let ticker = item?.['ticker'];

        let regexExpression = new RegExp(/[0-9\.\+-]+/);
        
        let changesPercentage = (item['changesPercentage'].match(regexExpression) || []).join('');

        return new MainPageInfoListElementData(
            ticker,
            price,
            changesPercentage,
            changes,
            companyName
        );
    }
}