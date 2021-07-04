import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ROUTES } from './main-page.routes';
import { MainPageComponent } from './main-page.component';
import { MainPageInfoListComponent } from './main-page-components/main-page-info-list/main-page-info-list.component';
import { MainPageMajorIndexesChartComponent } from './main-page-components/main-page-major-indexes-chart/main-page-major-indexes-chart.component';
import { MainPageNewsComponent } from './main-page-components/main-page-news/main-page-news.component';
import { MainPageNewsElementComponent } from './main-page-components/main-page-news/main-page-news-element/main-page-news-element.component';
import { MainPageNewsListComponent } from './main-page-components/main-page-news/main-page-news-list/main-page-news-list.component';
import { MatAutocompleteModule, MatAutocomplete } from '@angular/material';
import { GetArrayPipe } from '../_pipes/get-array.pipe';
import { GetSymbolNamePipe } from '../_pipes/get-symbol-name.pipe';
import { NullValueConverterPipe } from '../_pipes/null-value-converter.pipe';
import { TimeElapsedPipe } from '../_pipes/time-elapsed.pipe';
import { GetRandomPipe } from '../_pipes/get-random.pipe';
import { TwoDecimalPipe } from '../_pipes/two-decimal.pipe';
import { AddSymbolPipe } from '../_pipes/add-symbol.pipe';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared.module';
import { StockPriceTickerModule } from '../stock-price-ticker/stock-price-ticker.module';

@NgModule({
  declarations: [
    MainPageComponent,
    MainPageNewsComponent,
    MainPageInfoListComponent,
    MainPageNewsListComponent,
    MainPageNewsElementComponent,
    MainPageMajorIndexesChartComponent,


  ],
  imports: [
    CommonModule,
    SharedModule,
    StockPriceTickerModule,
    
    MatAutocompleteModule,
    
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),

  ],
  exports: [
    MainPageComponent
  ]
})
export class MainPageModule { }
