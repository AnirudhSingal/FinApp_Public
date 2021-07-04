import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { StockListDataService } from 'src/app/_services/component-data/list-page/stock-list-data.service';
import { ListPageType } from 'src/app/_enums/list-page-type';
import { MatTableDataSource, MatPaginatorModule, MatSort, MatPaginator, PageEvent } from '@angular/material';
import { StockListData } from 'src/app/_models/list-page-models/stock-list-data';
import { EventEmitter } from '@angular/core';
import { CurrencyListDataService } from 'src/app/_services/component-data/list-page/currency-list-data.service';
import { CryptoCurrencyListDataService } from 'src/app/_services/component-data/list-page/crypto-currency-list-data.service';

@Component({
  selector: 'app-list-page-list',
  templateUrl: './list-page-list.component.html',
  styleUrls: ['./list-page-list.component.css']
})
export class ListPageListComponent implements OnInit {

  @Input() listType: ListPageType; // inpit for the table
  @Output() pageChange: EventEmitter<string[]> = new EventEmitter<string[]>();

  isDataLoaded: boolean = false;
  list: String[];
  dataList$: Observable<StockListData[]>;
  dataSource: MatTableDataSource<StockListData>;
  pageSizes: number[];
  initialPageSize: number;
  displayedStockColumns: string[];
  displayedCurrencyColumns: string[];
  displayedCryptoColumns: string[];
  displayedColumns: string[];
  label: string;

  @ViewChild(MatSort, { static: false }) set sort(sort: MatSort) {
    try {
      this.dataSource.sort = sort;
    } catch (error) { }
  }
  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    try {
      this.dataSource.paginator = paginator;
    } catch (error) { }
  }


  constructor(
    private stockListData: StockListDataService,
    private currencyListData: CurrencyListDataService,
    private cryptoCurrencyListData: CryptoCurrencyListDataService
  ) {
    // declaring pagination pageSizes
    this.initialPageSize = 20;
    this.pageSizes = [this.initialPageSize, 50, 10]
    this.displayedStockColumns = ['symbol', 'name', 'price', 'change', 'changesPercentage', 'volume', 'avgVolume', 'marketCap', 'peRatio', 'yearRange'];
    this.displayedCurrencyColumns = ['symbol', 'name', 'price', 'change', 'changesPercentage', 'yearRange'];
    this.displayedCryptoColumns = ['symbol', 'name', 'price', 'change', 'changesPercentage', 'volume', 'avgVolume', 'marketCap', 'yearRange'];
  }

  ngOnInit(): void {

    // Get data observable based on the type of list
    switch (this.listType) {
      case (ListPageType.Actives):
        this.dataList$ = this.stockListData.getData(this.listType);
        this.displayedColumns = this.displayedStockColumns;
        this.label = "Active Stocks";
        break;
      case (ListPageType.Gainers):
        this.dataList$ = this.stockListData.getData(this.listType);
        this.displayedColumns = this.displayedStockColumns;
        this.label = "Top Gainers";
        break;
      case (ListPageType.Losers):
        this.dataList$ = this.stockListData.getData(this.listType);
        this.displayedColumns = this.displayedStockColumns;
        this.label = "Top Losers";
        break;
      case (ListPageType.Currencies):
        this.dataList$ = this.currencyListData.getData();
        this.displayedColumns = this.displayedCurrencyColumns;
        this.label = "Currencies";
        break;
      case (ListPageType.CryptoCurrencies):
        this.label = "Cryptocurrencies";
        this.dataList$ = this.cryptoCurrencyListData.getData();
        this.displayedColumns = this.displayedCryptoColumns;
        break;
      default:
    }

    this.dataList$.subscribe(list => {
      this.dataSource = new MatTableDataSource(list);
      this.isDataLoaded = true;

      //emitting list of symbols being diplayed on page load
      let currentList = this.getCurrentSymbolList(list, 0, this.initialPageSize);
      this.pageChange.emit(currentList);
    })
  }


  // to emit the the current list of symbols being displayed
  onPaginate(pageEvent: PageEvent) {
    this.dataList$.subscribe(list => {

      let currentList: string[] = null;
      try {
        let pageStart = pageEvent.pageIndex * pageEvent.pageSize
        let pageEnd = pageStart + pageEvent.pageSize;
        currentList = this.getCurrentSymbolList(list, pageStart, pageEnd);
      } catch (error) {
        currentList = [];
      }
      this.pageChange.emit(currentList)
    })
  }


  // get the list of current symbols 
  getCurrentSymbolList(dataList: StockListData[], pageStart: number, pageEnd: number) {

    try {
      let symbolList = dataList.map(elem => elem.symbol);
      let currentList = symbolList.slice(pageStart, pageEnd);
      return currentList;
    } catch (error) {
      return [];
    }
  }
}