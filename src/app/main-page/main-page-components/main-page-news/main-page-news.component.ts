import { Component, OnInit } from '@angular/core';
import { MainPageNewsListDataService } from 'src/app/_services/component-data/main-page/main-page-news-list-data.service';
import { NewsData } from 'src/app/_models/news-data';

@Component({
  selector: 'app-main-page-news',
  templateUrl: './main-page-news.component.html',
  styleUrls: ['./main-page-news.component.css']
})
export class MainPageNewsComponent implements OnInit {
  
  isDataLoaded : boolean = false;
  newsData: NewsData[];
  data : NewsData;
  constructor(
    private newsListData: MainPageNewsListDataService
  ) { }

  ngOnInit(): void {
    this.newsListData.getData().subscribe(_=>{
      this.newsData = _;
      this.data = this.newsData.shift()
      this.isDataLoaded = true;
    })
  }

}
