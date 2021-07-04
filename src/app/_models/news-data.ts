import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export class NewsData{
    
    constructor(
        public symbol: string,
        public title: string, 
        public image: string,
        public url: string,
        public text: string,
        public date: string,
        public site: string
    ) {}

    // "publishedDate" : "2020-09-08 09:25:00",
}

@Injectable({
    providedIn: "root",
})
export class NewsDataAdapter implements Adapter<NewsData>{
    adapt(item:any): NewsData {
        return new NewsData(
            item.symbol, 
            item.title,
            item.image, 
            item.url, 
            item.text,
            item.publishedDate,
            item.site   
        );
    }
}