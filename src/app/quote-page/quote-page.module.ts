import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './quote-page.router';
import { QuotePageComponent } from './quote-page.component';
import { QuoteCardAboutComponent } from './quote-card-components/quote-card-about/quote-card-about.component';
import { QuoteCardDataboxComponent } from './quote-card-components/quote-card-databox/quote-card-databox.component';
import { QuoteCartSimpleChartComponent } from './quote-card-components/quote-cart-simple-chart/quote-cart-simple-chart.component';
import { QuoteCartDetailedChartComponent } from './quote-card-components/quote-cart-detailed-chart/quote-cart-detailed-chart.component';
import { QuoteCardKeyStatisticsComponent } from './quote-card-components/quote-card-key-statistics/quote-card-key-statistics.component';
import { QuoteCardNewsComponentComponent } from './quote-card-components/quote-card-news-press-release/quote-card-news-press-release-components/quote-card-news-component/quote-card-news-component.component';
import { QuotePageSnapshotSummaryComponent } from './quote-card-components/quote-page-snapshot-summary/quote-page-snapshot-summary.component';
import { QuotePageSnapshotDetailsComponent } from './quote-card-components/quote-page-snapshot-details/quote-page-snapshot-details.component';
import { QuoteCardNewsPressReleaseComponent } from './quote-card-components/quote-card-news-press-release/quote-card-news-press-release.component';
import { QuoteCardPressReleaseComponentComponent } from './quote-card-components/quote-card-news-press-release/quote-card-news-press-release-components/quote-card-press-release-component/quote-card-press-release-component.component';
import { QuoteCardFinancialStatementDataComponent } from './quote-card-components/quote-card-financial-statement-data/quote-card-financial-statement-data.component';
import { GetRandomPipe } from '../_pipes/get-random.pipe';
import { GetArrayPipe } from '../_pipes/get-array.pipe';
import { AddSymbolPipe } from '../_pipes/add-symbol.pipe';
import { TwoDecimalPipe } from '../_pipes/two-decimal.pipe';
import { TimeElapsedPipe } from '../_pipes/time-elapsed.pipe';
import { TruncateTextPipe } from '../_pipes/truncate-text.pipe';
import { GetSymbolNamePipe } from '../_pipes/get-symbol-name.pipe';
import { AbrreviateNumberPipe } from '../_pipes/abrreviate-number.pipe';
import { NullValueConverterPipe } from '../_pipes/null-value-converter.pipe';
import { SharedModule } from '../shared.module';
import { MatButtonModule, MatButtonToggleModule } from '@angular/material';



@NgModule({
  declarations: [
    
    QuotePageComponent,
    QuoteCardAboutComponent,
    QuoteCardDataboxComponent,
    QuoteCartSimpleChartComponent,
    QuoteCartDetailedChartComponent,
    QuoteCardKeyStatisticsComponent,
    QuoteCardNewsComponentComponent,
    QuotePageSnapshotSummaryComponent,
    QuotePageSnapshotDetailsComponent,
    QuoteCardNewsPressReleaseComponent,
    QuoteCardPressReleaseComponentComponent,
    QuoteCardFinancialStatementDataComponent,
    
  ],
  exports: [],
  imports: [
    CommonModule,
    SharedModule,

    MatButtonModule,
    MatButtonToggleModule,


    RouterModule.forChild(ROUTES),
  ]
})
export class QuotePageModule { }
