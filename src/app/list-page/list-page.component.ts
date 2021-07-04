import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListPageType } from '../_enums/list-page-type';
import { ListPageNewsListComponent } from './list-page-components/list-page-news-list/list-page-news-list.component';
import { BehaviorSubject } from 'rxjs';
import { NewsData } from '../_models/news-data';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit, AfterViewInit {
  listType: ListPageType;
  listPageType = ListPageType;
  isDataLoaded: boolean = false;
  currentSymbolList: string[];
  isNewsDataLoaded: boolean = false;
  isNewsDataLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  newsListInitialData$: BehaviorSubject<string[]>;

  @ViewChild('newsList') private newsList: ListPageNewsListComponent;
  label: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.listType = data.ListType
      this.isDataLoaded = true;

      switch (this.listType) {
        case (ListPageType.Actives):
          this.label = "Active Stocks";
          break;
        case (ListPageType.Gainers):
          this.label = "Top Gainers";
          break;
        case (ListPageType.Losers):
          this.label = "Top Losers";
          break;
        case (ListPageType.Currencies):
          this.label = "Currencies";
          break;
        case (ListPageType.CryptoCurrencies):
          this.label = "Cryptocurrencies";
          break;
        default:
          this.router.navigate(['/'])
      }

    })
  }

  ngAfterViewInit(): void {
    let mysub = this.isNewsDataLoaded$.subscribe(val=>{
      if(val){
        this.newsListInitialData$.pipe(take(1)).subscribe(data=>{
          this.currentSymbolList = data;
          this.isNewsDataLoaded = true;
          mysub.unsubscribe();
        })
      }
    })
  }

  // page Change Event Handler
  onPageChange(event: any) {
    let loadList: boolean;
    let mySub = this.isNewsDataLoaded$.subscribe(val => {
      if (!val) {
        this.newsListInitialData$ = new BehaviorSubject(event); // setting the list of symbols initially supplied by list component to be used to get the initial news list
        this.isNewsDataLoaded$.next(true); // trigger to run the code inside the subscription in ngAfterContentInit
        loadList = false;
      } else {
        loadList = true;
      }
    })
    if (loadList) {
      mySub.unsubscribe();
      this.isNewsDataLoaded = false;
      this.newsList.symbolList = event
      this.isNewsDataLoaded = true;
      this.newsList.ngOnInit();
      this.newsList.ngAfterViewInit();
    }
  }
}