import { Component, OnInit, Input } from '@angular/core';
import { QuoteCardDataService } from 'src/app/_services/component-data/quote-card/quote-card-data.service';
import { QuoteCardData } from 'src/app/_models/quote-card-data';

@Component({
  selector: 'app-quote-page-snapshot-summary',
  templateUrl: './quote-page-snapshot-summary.component.html',
  styleUrls: ['./quote-page-snapshot-summary.component.css']
})
export class QuotePageSnapshotSummaryComponent implements OnInit {

  @Input() public symbol: string;
  data : QuoteCardData;
  isDataLoaded : boolean = false;

  constructor(
    private quoteCardData: QuoteCardDataService
  ) { }

  ngOnInit(): void {
    this.quoteCardData.getData(this.symbol).subscribe(data => {
      this.data = data;
      this.isDataLoaded = true;
    })
  }

}
