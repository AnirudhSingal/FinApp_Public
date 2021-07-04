import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export class ProfileData {

    constructor(
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

        
    ) { }

    // yearHigh?: number;
    // yearLow?: number;
    // marketCap?: number;
    // priceAvg50?: number;
    // priceAvg200?: number;
    // volume?: number;
    // avgVolume?: number;
    // exhange?: string;

    // symbol  :string;
    // price	:number;
    // beta	:number;
    // volAvg	:number;
    // mktCap	:number;
    // lastDiv	:number;
    // range	:string;
    // changes	:number;
    // companyName	:string;
    // exchange	:string;
    // exchangeShortName	:string;
    // industry	:string;
    // website :string;
    // description	:string;
    // ceo	:string;
    // sector	:string;
    // country:string;
    // fullTimeEmployees	:string;
    // phone	:string;
    // address	:string;
    // city	:string;
    // state	:string;
    // zip	:string;
    // dcfDiff	:number;
    // dcf	:number;
    // image	:string;


}

@Injectable({
    providedIn: "root",
})
export class ProfileAdapter implements Adapter<ProfileData>{
    adapt(item: any): ProfileData {
        return new ProfileData(
            item.companyName,
            item.image,
            item.currency,
            item.country,
            item.exchangeShortName,
            item. industry,
            item. website,
            item. description,
            item. ceo,
            item. sector,
            item. fullTimeEmployees,
            item. phone,
            item. address,
            item. city,
            item. state,
            item. zip,
        );
    }
}
