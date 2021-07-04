import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { NewsData } from 'src/app/_models/news-data';
import { ListPageNewsService } from 'src/app/_services/component-data/list-page/list-page-news.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-list-page-news-list',
  templateUrl: './list-page-news-list.component.html',
  styleUrls: ['./list-page-news-list.component.css']
})
export class ListPageNewsListComponent implements OnInit {
  constructor(
    private el: ElementRef,
    private newsListService: ListPageNewsService
  ) {
  }

  @Input() symbolList: string[]
  @ViewChild('anchor',  { static: false }) set setaAnchor(anchor: ElementRef<HTMLElement>){
    try {
      this.anchor = anchor;
      this.isAnchorLoaded$.next(true);
    } catch (error) {}
  };
  
  newsListData$: Observable<NewsData[]>;
  isAnchorLoaded$ : BehaviorSubject<boolean> =new BehaviorSubject(false);
  anchor: ElementRef<HTMLElement>;
  newsList: NewsData[];
  isLoadMoreButtonActive: boolean = false;
  isDataLoaded: boolean = false;
  isInitialLoadDone: boolean = false;
  infiniteScrollList: NewsData[] = [];
  observer: any;

  ngOnInit(): void {
    this.infiniteScrollList=[];
    this.newsListData$ = this.newsListService.getData(this.symbolList.join(','), 200);
    this.newsListData$.subscribe(data => {
      this.newsList = data;
      this.isDataLoaded = true;
    })
  }

  ngAfterViewInit(): void {
    // function to handle intersection event
    const handleIntersect = (entries, observer) => {
      if (!this.isLoadMoreButtonActive) {
        if(this.newsList.length > 0){
          if (this.newsList.length > 150) {
            setTimeout(() => {
              this.loadMoreNews(this.newsList, this.infiniteScrollList)
            }, this.isInitialLoadDone ? 500 : 0)
          } else {
            this.isLoadMoreButtonActive = true
          }
        }
      }
    }
    // creating observer for infinite scroll using intersection API
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    };
    this.newsListData$.subscribe(data => {
      if (!this.isInitialLoadDone) {
        this.isInitialLoadDone = true;
      }
      this.observer = new IntersectionObserver(handleIntersect, options);
      // waiting for anchor to load before setting it as the observe object
      this.isAnchorLoaded$.subscribe(val => {
        if(val){
          this.observer.observe(this.anchor.nativeElement);
        }
      })
    });
  }

  // redirect to news website on clicking the component
  redirectToLink(url: string) {
    window.location.href = url;
  }

  loadMoreNews(newsList: NewsData[], infiniteScrollList: NewsData[]) {
    for (let index = 0; index < 10; index++) {
      if (newsList.length > 0) {
        infiniteScrollList.push(newsList.shift())
      }else{
        this.isLoadMoreButtonActive = false
        break;
      }
    }
  }
}