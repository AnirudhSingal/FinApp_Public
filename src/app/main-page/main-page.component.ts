import { Component,
  OnInit, 
  ViewChild, 
  ViewContainerRef, 
  ElementRef, 
  AfterViewInit, 
  HostListener, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, 
  startWith, 
  mergeMap } from 'rxjs/operators';
import { Observable, 
  BehaviorSubject } from 'rxjs';
import { ActivatedRoute, 
  Router } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { QuoteData } from '../_models/quote-data';
import { ProfileData } from '../_models/profile-data';
import { NewsData } from '../_models/news-data';
import { MainPageInfoListElementData } from '../_models/main-page-info-list-element-data';
import { SymbolData } from '../_models/symbol-data';
import { MainPageSymbolListDataService } from '../_services/component-data/main-page/main-page-symbol-list-data.service';
import { MainPageForexListDataService } from '../_services/component-data/main-page/main-page-forex-list-data.service';
import * as StickySidebar from 'node_modules/sticky-sidebar/dist/sticky-sidebar.js';
import { MainPageCryptocurrencyListDataService } from '../_services/component-data/main-page/main-page-cryptocurrency-list-data.service';
import { ListPageType } from '../_enums/list-page-type';
import { MainPageStocksListDataService } from '../_services/component-data/main-page/main-page-stocks-list-data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 30000000, noPause: true, showIndicators: true } }
  ]
})
export class MainPageComponent implements OnInit, AfterViewInit {


  componentRef: any;

  isMainContainerLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isSideContainerLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  entry: ViewContainerRef
  quoteData$: Observable<QuoteData>;
  profileData$: Observable<ProfileData>;
  mainNewsData: NewsData;
  newsData: NewsData[];
  activeStocks$: Observable<MainPageInfoListElementData[]>;
  gainerStocks$: Observable<MainPageInfoListElementData[]>;
  loserStocks$: Observable<MainPageInfoListElementData[]>;
  currencyList$: Observable<MainPageInfoListElementData[]>;
  cryptocurrencyList$: Observable<MainPageInfoListElementData[]>;
  symbolValue: string;
  symbolName: string;
  options$: Observable<any>;
  public items: SymbolData[];
  symbol = new FormControl('');
  isSmallScreen: boolean = false;

  listPageType = ListPageType;

  chartDataArray: any = [];
  isDataLoaded: boolean = false;
  sidebar: any;

  @ViewChild('mainContainer', { static: false }) set mainContainer(sideContainer: ElementRef<HTMLElement>) {
    try {
      this.isMainContainerLoaded$.next(true);
    } catch (error) { }
  }
  @ViewChild('sideContainer', { static: false }) set sideContainer(sideContainer: ElementRef<HTMLElement>) {
    try {
      this.isSideContainerLoaded$.next(true);
    } catch (error) { }
  }

  @HostListener("window:resize", ['$event']) // switch the simple chart between main and side areas
  private onResize(event) {

    let pagewidth = event.target.innerWidth;
    this.setSmallScreen(pagewidth)
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private symbolListData: MainPageSymbolListDataService,
    private stocksListData: MainPageStocksListDataService,
    private forexListData: MainPageForexListDataService,
    private cryptoListData: MainPageCryptocurrencyListDataService,
    private el: ElementRef
  ) { }

  ngAfterViewInit(): void {
    // code for sticky sidebar using sticky-sidabar library
    this.isMainContainerLoaded$.pipe(mergeMap(valMain => {
      return this.isSideContainerLoaded$.pipe(map(valSide => {
        return (valMain && valSide)
      }))
    })).subscribe(val => {
      if (val) {
        this.sidebar = new StickySidebar('#main-page-sidebar', {
          containerSelector: '#main-content',
          innerWrapperSelector: '.main-page-sidebar-inner',
          resizeSensor: true,
          // minWidth: 1024
          topSpacing: 20,
          bottomSpacing: 20
        })
      }
    })
  }

  ngOnInit(): void {
    // Reading Data
    this.symbolListData.getData().subscribe(data => {
      this.items = data;
      this.options$ = this.symbol.valueChanges.pipe(
        startWith(''),
        map(value => {
          let val = this._filter(value);
          return val;
        }),
      );
  
      this.symbol.valueChanges.subscribe(value => {
        if (this.items.includes(value)) {
          this.symbolValue = value.symbol.toString();
          this.router.navigate(['/quote', this.symbolValue])
        }
      });
    })
      
      this.activeStocks$ = this.stocksListData.getData(ListPageType.Actives);
      this.gainerStocks$ = this.stocksListData.getData(ListPageType.Gainers);
      this.loserStocks$ = this.stocksListData.getData(ListPageType.Losers);
      this.currencyList$ = this.forexListData.getData();
      this.cryptocurrencyList$ = this.cryptoListData.getData();
      let pagewidth = this.el.nativeElement.offsetWidth;
      this.setSmallScreen(pagewidth)
      
    this.activatedRoute.data.subscribe(data => {
      this.chartDataArray = data.graphData
    })


  }


  ngAfterViewChecked(): void {
    let pagewidth = this.el.nativeElement.offsetWidth;
    this.setSmallScreen(pagewidth)
  }

  private setSmallScreen(pagewidth: number): void {
    if (pagewidth != 0) {
      if (pagewidth > 1024) {
        this.isSmallScreen = false;
      } else {
        this.isSmallScreen = true;
      }
    }
  }

  private _filter(value: string): SymbolData[] {
    const filterValue = value.toString().toLowerCase();
    return this.items.filter(option => {
      return (option.name.toString().toLowerCase().includes(filterValue) || option.symbol.toLowerCase().includes(filterValue))
    }).slice(0,5);
  }

  displayFn(value?: SymbolData): string {
    return value ? value.name + ' - ' + value.symbol : '';
  }
}