import { Component, OnInit, Input } from '@angular/core';
import { QuoteCardDataService } from 'src/app/_services/component-data/quote-card/quote-card-data.service';
import { QuoteCardData } from 'src/app/_models/quote-card-data';

@Component({
  selector: 'app-quote-page-snapshot-details',
  templateUrl: './quote-page-snapshot-details.component.html',
  styleUrls: ['./quote-page-snapshot-details.component.css']
})
export class QuotePageSnapshotDetailsComponent implements OnInit {


  @Input() private symbol;
  data: QuoteCardData;
  isDataLoaded : boolean = false;


  constructor(
    private quoteCardData: QuoteCardDataService
  ) { }

  ngOnInit(): void {

    this.quoteCardData.getData(this.symbol).subscribe(data =>{
      this.data = data;
      this.isDataLoaded  = true; 
    })
  }
}
