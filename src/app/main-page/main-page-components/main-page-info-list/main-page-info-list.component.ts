import { Component, OnInit, Input, ViewChildren, ElementRef, QueryList, AfterViewInit, AfterViewChecked, ViewChild, AfterContentInit } from '@angular/core';
import { MainPageInfoListElementData } from 'src/app/_models/main-page-info-list-element-data';
import { Observable } from 'rxjs';
import { ListPageType } from 'src/app/_enums/list-page-type';

@Component({
  selector: 'app-main-page-info-list',
  templateUrl: './main-page-info-list.component.html',
  styleUrls: ['./main-page-info-list.component.css']
})
export class MainPageInfoListComponent implements OnInit {

  @Input() public data: Observable<MainPageInfoListElementData[]>;

  @Input() public listType: ListPageType;


  @ViewChildren("coloredLabel", { read: ElementRef })
  coloredLabels: QueryList<ElementRef>


  @ViewChildren("changeLabel", { read: ElementRef })
  changeLabel: QueryList<ElementRef>
  // @ViewChild("changeLabel", { read: ElementRef, static: false })
  // changeLabel : ElementRef;

  tableData: MainPageInfoListElementData[];
  dataArrayWithColorLabels: any = [];
  isDataLoaded: boolean = false;
  tableLabel: string;
  routerLinkValue: string;
  constructor() { }

  ngOnInit() {

    switch (this.listType) {
      case ListPageType.Actives:
        this.tableLabel = "Active Stocks" 
        this.routerLinkValue = '/active-stocks'
        break;
      case ListPageType.Gainers:
        this.tableLabel = "Top Gainers" 
        this.routerLinkValue = '/stock-gainers'
        break;
      case ListPageType.Losers:
        this.tableLabel = "Top Losers" 
        this.routerLinkValue = '/stock-losers'
        break;
      case ListPageType.Currencies:
        this.tableLabel = "Currencies" 
        this.routerLinkValue = '/currencies'

        break;
      case ListPageType.CryptoCurrencies:
        this.tableLabel = "Cryptocurrencies" 
        this.routerLinkValue = '/crypto-currencies'
        break;
      default:
        break;
    }

    this.data.subscribe(_ => {
      this.tableData = _.splice(0, 5);
      this.isDataLoaded = true;
    })
  }
}