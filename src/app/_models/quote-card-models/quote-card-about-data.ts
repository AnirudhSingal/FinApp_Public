import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Adapter } from '../adapter';
import { ChartPoint } from '../chart-point';

export class QuoteCardAboutData{
    constructor(
        public companyName:string,
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
        public country: string,
    ) {}
}

@Injectable({
    providedIn: "root",
})
export class QuoteCardAboutDataAdapter implements Adapter<QuoteCardAboutData>{
    adapt(item: any): QuoteCardAboutData {
        return new QuoteCardAboutData(
            item.companyName,
            item.website,
            item.description,
            item.ceo,
            item.sector,
            item.fullTimeEmployees,
            item.phone,
            item.address,
            item.city,
            item.state,
            item.zip,
            item.country
        );

    }
}
