import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { NewsData, NewsDataAdapter } from 'src/app/_models/news-data';
import { QuoteCardNewsPressReleaseDataService } from 'src/app/_services/component-data/quote-card/quote-card-news-press-release-data.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-quote-card-news-component',
  templateUrl: './quote-card-news-component.component.html',
  styleUrls: ['./quote-card-news-component.component.css']
})
export class QuoteCardNewsComponentComponent implements OnInit {

  @Input() symbol: string

  anchor: ElementRef<HTMLElement>; // anchor for intersection observer
  isAnchorLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(false); // behaviour to indicate anchor is loaded
  @ViewChild('anchor', { static: false }) set setAnchor(anchor: ElementRef<HTMLElement>) {
    try {
      this.anchor = anchor;
      this.isAnchorLoaded$.next(true);
    } catch (error) { }
  };

  isLoadMoreButtonActive: boolean = false;
  isDataLoaded: boolean = false;
  isInitialLoadDone: boolean = false;
  infiniteScrollList: NewsData[] = [];
  observer: any;
  newsList: NewsData[];

  initialLoad$: Observable<any>;

  constructor(
    private newsPressReleaseDataService: QuoteCardNewsPressReleaseDataService,
    private newsDataAdapter:NewsDataAdapter
  ) { }

  ngOnInit(): void {
    this.infiniteScrollList = [];
    this.initialLoad$ = this.newsPressReleaseDataService.getNewsdata(this.symbol, 100);
    this.initialLoad$.subscribe(data => {
      this.newsList = data;
      this.isDataLoaded = true;
    })
  }

  ngAfterViewInit(): void {
    // function to handle intersection event
    const handleIntersect = (entries, observer) => {
      if (!this.isLoadMoreButtonActive) {
        if (this.newsList.length > 50) {
          setTimeout(() => {
            this.loadMoreItems(this.newsList, this.infiniteScrollList)
          }, this.isInitialLoadDone ? 500 : 0)
        } else {
          this.isLoadMoreButtonActive = true
        }
      }
    }
    // creating observer for infinite scroll using intersection API
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };
    this.initialLoad$.subscribe(data => {
      if (!this.isInitialLoadDone) {
        this.isInitialLoadDone = true;
      }
      this.observer = new IntersectionObserver(handleIntersect, options);
      // waiting for anchor to load before setting it as the observe object
      this.isAnchorLoaded$.subscribe(val => {
        if (val) {
          this.observer.observe(this.anchor.nativeElement);
        }
      })
    });
  }

  // redirect to news website on clicking the component
  redirectToLink(url: string) {
    window.location.href = url;
  }

  loadMoreItems(newsList: NewsData[], infiniteScrollList: NewsData[]) {
    for (let index = 0; index < 10; index++) {
      if (newsList.length > 0) {
        infiniteScrollList.push(newsList.shift())
      } else {
        this.isLoadMoreButtonActive = false;
        break;
      }
    }
  }
}