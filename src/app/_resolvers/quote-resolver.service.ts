import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SymbolData, SymbolDataAdapter } from '../_models/symbol-data';
import { CacheTransactionsService } from '../_services/caching/cache-transactions.service';

@Injectable({
    providedIn: 'root'
})
export class SymbolListResolverService implements Resolve<SymbolData[]>{
    constructor(    
        private cacheTransactions: CacheTransactionsService, 
        private symbolDataAdapter: SymbolDataAdapter
    ){}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    SymbolData[] | Observable<SymbolData[]> | Promise<SymbolData[]>
    {

        let symbolList : Observable<SymbolData[]> = this.cacheTransactions.getCacheable<SymbolData[]>(
            'https://financialmodelingprep.com/api/v3/stock/list', 300000
          )
          .pipe(
            map(value => {
              value.map(val => this.symbolDataAdapter.adapt(val))
              return value.filter(val => !(val.name == undefined || val.symbol ==undefined || val.price == 0)) 
            }),
            catchError(err => {
              return [];
            })
          );
          return symbolList;

    }
    
}