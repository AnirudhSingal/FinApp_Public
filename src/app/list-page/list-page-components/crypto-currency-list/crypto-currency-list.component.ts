import { Component, OnInit, ViewChild } from '@angular/core';
import { CryptoCurrencyListData } from 'src/app/_models/list-page-models/crypto-currency-list-data';
import { CryptoCurrencyListDataService } from 'src/app/_services/component-data/list-page/crypto-currency-list-data.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CurrencyListData } from 'src/app/_models/list-page-models/currency-list-data';

@Component({
  selector: 'app-crypto-currency-list',
  templateUrl: './crypto-currency-list.component.html',
  styleUrls: ['./crypto-currency-list.component.css']
})
export class CryptoCurrencyListComponent implements OnInit {
  isDataLoaded: boolean= false;
  dataSource: MatTableDataSource<CryptoCurrencyListData>;
  
  displayedColumns =
  ['symbol', 'name', 'price', 'change', 'changesPercentage', 'volume', 'avgVolume', 'marketCap', 'yearRange'];

  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    try {
      this.dataSource.paginator = paginator;
    } catch (error) {}
  }
  @ViewChild(MatSort, { static: false }) set sort(sort: MatSort) {
    try {
      this.dataSource.sort = sort;
    } catch (error) {}
  }

  constructor(
    private cryptoCurrencyListData: CryptoCurrencyListDataService
  ) { }

  ngOnInit(): void {
    this.cryptoCurrencyListData.getData().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data)
      this.isDataLoaded = true;
    });
  }



}