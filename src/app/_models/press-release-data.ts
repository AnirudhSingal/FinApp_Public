import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export class PressReleaseData{
    
    constructor(
        public symbol: string,
        public title: string, 
        public text: string
        ) {}
        
    // public date: string
}

@Injectable({
    providedIn: "root",
})
export class PressReleaseDataAdapter implements Adapter<PressReleaseData>{
    adapt(item:any): PressReleaseData {
        return new PressReleaseData(
            item.symbol, 
            item.title,
            item.text
        );
    }
}