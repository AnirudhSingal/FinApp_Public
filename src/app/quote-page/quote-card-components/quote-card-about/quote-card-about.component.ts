import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { QuoteCardAboutData, QuoteCardAboutDataAdapter } from 'src/app/_models/quote-card-models/quote-card-about-data';
import { QuoteData } from 'src/app/_models/quote-data';
import { Observable, ReplaySubject } from 'rxjs';
import { QuoteCardDataService } from 'src/app/_services/component-data/quote-card/quote-card-data.service';
import { QuoteCardData } from 'src/app/_models/quote-card-data';

@Component({
  selector: 'app-quote-card-about',
  templateUrl: './quote-card-about.component.html',
  styleUrls: ['./quote-card-about.component.css']
})
export class QuoteCardAboutComponent implements OnInit {

  @Input() public symbol: string

  constructor(
    private quoteCardData: QuoteCardDataService,
    private aboutDataAdapter: QuoteCardAboutDataAdapter

  ) { }

  data: QuoteData;
  aboutData: QuoteCardAboutData;
  description: string;
  address: string;
  isDescriptionExpanded: boolean;
  isDataLoaded: boolean = false;

  obs$: Observable<QuoteCardData>;
  blah: ReplaySubject<QuoteCardData>;

  @ViewChild("description", { read: ElementRef, static: false }) descriptionBox: ElementRef;
  @ViewChild("details", { read: ElementRef, static: false }) detailsBox: ElementRef;

  ngOnInit() {
    this.isDescriptionExpanded = false;
    this.quoteCardData.getData(this.symbol).subscribe(data => {
      this.aboutData = this.aboutDataAdapter.adapt(data);
      this.address = (this.aboutData.address == undefined ? '' : this.aboutData.address + ', ')
        + (this.aboutData.city == undefined ? '' : this.aboutData.city + ', ')
        + (this.aboutData.state == undefined ? '' : this.aboutData.state + ', ')
        + (this.aboutData.zip == undefined ? '' : this.aboutData.zip + ', ')
        + (this.aboutData.country == undefined ? '' : this.aboutData.country);
      this.isDataLoaded = true;
    })
  }

  expandAbout() {
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
    if (this.isDescriptionExpanded) {
      this.descriptionBox.nativeElement.style.height = "100%";
    } else {
      this.descriptionBox.nativeElement.style.height = "calc(" + this.detailsBox.nativeElement.offsetHeight + 'px - 1em)'
    }
  }
}