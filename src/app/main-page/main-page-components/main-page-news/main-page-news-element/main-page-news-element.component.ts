import { Component, OnInit, Input } from '@angular/core';
import { NewsData } from 'src/app/_models/news-data';
import { MainPageNewsListDataService } from 'src/app/_services/component-data/main-page/main-page-news-list-data.service';

@Component({
  selector: 'app-main-page-news-element',
  templateUrl: './main-page-news-element.component.html',
  styleUrls: ['./main-page-news-element.component.css']
})
export class MainPageNewsElementComponent implements OnInit {
  @Input() public data : NewsData;

  constructor(
    private newsListData: MainPageNewsListDataService
  ) {}

  ngOnInit() {
  }

  redirectToLink(){
    window.location.href = this.data.url;
  }
  setBgImage(){
    return {
      'background-image' : 'url( '+ this.data.image +')'
      // linear-gradient(to bottom,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0)),
    }
  }

}
