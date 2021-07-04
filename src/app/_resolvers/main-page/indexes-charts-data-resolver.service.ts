import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, of, from, observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class IndexesChartsDataResolverService implements Resolve<any>{
   
    constructor(
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : any | Observable<any> | Promise<any> {
        
        
        let indexSymbols: string[] = ["^GSPC", "^DJI", "^IXIC"];
        let currencySymbols: string[] = ["EURUSD", "CADUSD"];
        let cryptoSymbols: string[] = ["BTCUSD"];
        
        let continuousSymbols = currencySymbols.concat(cryptoSymbols); 
        let retVal : any = [];
        let i = 0;


        indexSymbols.forEach(element => {
            let symbolValue = element.toUpperCase();
            let ret = forkJoin({
                symbol: of(symbolValue),
                isContinuous: of(false),
                idValue: of(i)
            })
            i++;
            retVal.push(ret)
        });
        continuousSymbols.forEach(element => {
            let symbolValue = element.toUpperCase();
            let ret = forkJoin({
                symbol: of(symbolValue),
                isContinuous: of(true),
                idValue: of(i)
            })
            i++;
            retVal.push(ret)
        });
        return forkJoin(retVal);
    }
}