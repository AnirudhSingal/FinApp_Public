import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-quote-card-news-press-release',
  templateUrl: './quote-card-news-press-release.component.html',
  styleUrls: ['./quote-card-news-press-release.component.css']
})
export class QuoteCardNewsPressReleaseComponent {
  @Input() public symbol: string

  isNewsOpen: boolean = true;
  constructor(
  ) { }

  ChangeType(value) {
    this.isNewsOpen = !this.isNewsOpen;
  }
}