import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { KeyStatsData } from 'src/app/_models/key-stats-data';
import { QouteCardKeyStatsDataService } from 'src/app/_services/component-data/quote-card/qoute-card-key-stats-data.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Component({
  selector: 'app-quote-card-key-statistics',
  templateUrl: './quote-card-key-statistics.component.html',
  styleUrls: ['./quote-card-key-statistics.component.css']
})
export class QuoteCardKeyStatisticsComponent implements OnInit {

  constructor(
    private quotaCardKeyStatsService: QouteCardKeyStatsDataService
  ) { }

  @Input() public symbol: string;
  keyStatsData: KeyStatsData
  isDataLoaded: boolean = false ;

  ngOnInit() {
    this.quotaCardKeyStatsService.getData(this.symbol).subscribe(data => {
      this.keyStatsData = data;
      this.isDataLoaded = true;
    })
  }
}