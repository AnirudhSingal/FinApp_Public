import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { NewsData } from 'src/app/_models/news-data';

@Component({
  selector: 'app-main-page-news-list',
  templateUrl: './main-page-news-list.component.html',
  styleUrls: ['./main-page-news-list.component.css']
})
export class MainPageNewsListComponent implements OnInit, AfterViewInit {

  constructor(
    private el : ElementRef
  ) { }

  @Input() newsList:NewsData[]
  @ViewChild('anchor', {static:false}) anchor: ElementRef<HTMLElement>;

  isLoadMoreNewsButtonActive :boolean = false;
  isDataLoaded :  boolean = false;
  isInitialLoadDone: boolean = false;
  infiniteScrollList : NewsData[] = [];
  observer:any;

  ngOnInit(): void {
    this.isDataLoaded = true;

    // creating observer for infinite scroll using intersection API
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    };

    
    const handleIntersect = (entries, observer)=>{
      if(!this.isLoadMoreNewsButtonActive){
        if (this.newsList.length > 50){
          setTimeout(()=>{
            this.loadMoreNews(this.newsList, this.infiniteScrollList)
          }, this.isInitialLoadDone? 500: 0)
        }else{
          this.isLoadMoreNewsButtonActive = true
        }
      }
    } 
    
    if(!this.isInitialLoadDone){
      this.isInitialLoadDone = true;
    } 
    this.observer = new IntersectionObserver(handleIntersect, options);
  }

  ngAfterViewInit(): void {
    this.observer.observe(this.anchor.nativeElement);
  }

  // redirect to news website on clicking the component
  redirectToLink(url :string){
    window.location.href = url;
  }

  loadMoreNews(newsList : NewsData[], infiniteScrollList: NewsData[]){
    for (let index = 0; index < 10; index++) {
      if(newsList.length>0){
        infiniteScrollList.push(newsList.shift())
      }else{
        this.isLoadMoreNewsButtonActive = false;
        break;
      }
    }
  }
}