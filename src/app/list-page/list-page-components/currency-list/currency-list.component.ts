import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CurrencyListDataService } from 'src/app/_services/component-data/list-page/currency-list-data.service';
import { CurrencyListData } from 'src/app/_models/list-page-models/currency-list-data';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.css']
})
export class CurrencyListComponent implements OnInit {
  isDataLoaded: boolean = false
  displayedColumns =
    ['symbol', 'name', 'price', 'change', 'changesPercentage', 'yearRange'];
  dataSource: MatTableDataSource<CurrencyListData>;

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
    private currencyListData: CurrencyListDataService
  ) { }
  ngOnInit(): void {
    this.currencyListData.getData().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
      this.isDataLoaded = true;
    });
  }
}