import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren, AfterViewChecked, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuoteCardData } from '../_models/quote-card-data';
import { QuoteCardAboutData } from '../_models/quote-card-models/quote-card-about-data';
import { QuoteData } from '../_models/quote-data';
import { BehaviorSubject, ObservableLike, Observable } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import * as StickySidebar from 'node_modules/sticky-sidebar/dist/sticky-sidebar.js';
import { QuoteDataService } from '../_services/component-data/quote-card/quote-data.service';

@Component({
  selector: 'app-quote-page',
  templateUrl: './quote-page.component.html',
  styleUrls: ['./quote-page.component.css']
})
export class QuotePageComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @ViewChildren("border", { read: ElementRef }) borderList: QueryList<ElementRef>
  data$: any;

  @ViewChild('mainContainer', { static: false }) set mainContainer(sideContainer: ElementRef<HTMLElement>) {
    try {
      this.isMainContainerLoaded$.next(true);
    } catch (error) { }
  }
  @ViewChild('sideContainer', { static: false }) set sideContainer(sideContainer: ElementRef<HTMLElement>) {
    try {
      this.sideContainer = sideContainer;
      this.isSideContainerLoaded$.next(true);
    } catch (error) { }
  }

  isDataLoaded: boolean = false;
  aboutData: QuoteCardAboutData;
  data: QuoteCardData;
  quoteData: QuoteData;
  symbolValue: string;
  isSimpleChartVisible: boolean = true;
  isSimpleChartOnSide: boolean = true;
  change: number;
  isMainContainerLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isSideContainerLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  sidebar: any;

  quoteData$: Observable<QuoteData>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private el: ElementRef,
    private quoteDataService: QuoteDataService,
  ) { }


  ngAfterViewInit(): void {
    // code for sticky sidebar using sticky-sidabar library
    this.isMainContainerLoaded$.pipe(mergeMap(valMain => {
      return this.isSideContainerLoaded$.pipe(map(valSide => {
        return (valMain && valSide)
      }))
    })).subscribe(val => {
      if (val) {
        this.sidebar = new StickySidebar('#quote-page-sidebar', {
          containerSelector: '#quote-content',
          innerWrapperSelector: '.quote-page-sidebar-inner',
          resizeSensor: true,
          bottomSpacing: 20
        })
      }
    })
  }


  @HostListener("window:resize", ['$event']) // switch the simple chart between main and side areas
  private onResize(event) {
    if (event.target.innerWidth > 768) {
      this.isSimpleChartOnSide = true;
    } else {
      this.isSimpleChartOnSide = false;
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(_ => {
      this.symbolValue = _['symbol'].toUpperCase();

      this.quoteData$ = this.quoteDataService.getQuoteData(this.symbolValue).pipe(
        map(quoteDataArray => {
          return quoteDataArray[0]
        })
      );
    });
  }

  ngAfterViewChecked(): void {

    let pagewidth = this.el.nativeElement.offsetWidth;
    if (pagewidth != 0) {
      if (pagewidth > 768) {
        this.isSimpleChartOnSide = true;
      } else {
        this.isSimpleChartOnSide = false;
      }
    }
  }

  toggleChart() {
    this.isSimpleChartVisible = !this.isSimpleChartVisible;
  }
}