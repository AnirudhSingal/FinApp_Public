// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule, APP_INITIALIZER } from '@angular/core';
// import { HttpClientModule, HttpClient} from '@angular/common/http';
// import { OidcSecurityService, OidcConfigService, ConfigResult, OpenIdConfiguration, AuthModule } from 'angular-auth-oidc-client';
// import { OidcConfigService } from 'angular-auth-oidc-client';


// angular-oauth2-oidc

import { NgModule, APP_INITIALIZER, ModuleWithComponentFactories } from '@angular/core';

import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OAuthModule, OAuthService, OAuthInfoEvent, UrlHelperService, OAuthLogger, AuthConfig } from 'angular-oauth2-oidc';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { authConfig } from './auth.config';
import { MainPageComponent } from './main-page/main-page.component';
import { NavComponent } from './nav/nav.component';
import { MaterialModule } from './material.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { QuoteAdapter } from './_models/quote-data';
import { ChartPointAdapter } from './_models/chart-point';
import { SymbolDataAdapter } from './_models/symbol-data';
import { AuthService } from './_services/auth.service';
import { AccountSettingsService } from './_services/account-settings.service';
import { AlertifyService } from './_services/error-handing/alertify.service';
import { CacheTransactionsService } from './_services/caching/cache-transactions.service';
import { D3Service } from './_services/d3.service';
import { CachingInterceptor } from './_services/caching/caching.interceptor';
import { ErrorInterceptor } from './_services/error-handing/error.inceptor';
import { QuoteCardAboutDataAdapter } from './_models/quote-card-models/quote-card-about-data';
import { IndexesChartsDataResolverService } from './_resolvers/main-page/indexes-charts-data-resolver.service';
import { LimitRateInterceptor } from './_services/interceptors/limit-rate.interceptor';

import { TwoDecimalPipe } from './_pipes/two-decimal.pipe';
import { ListPageType } from './_enums/list-page-type';
import { ListPageYearRangeComponent } from './list-page/list-page-components/list-page-year-range/list-page-year-range.component';
import { CryptoCurrencyListComponent } from './list-page/list-page-components/crypto-currency-list/crypto-currency-list.component';
import { CurrencyListComponent } from './list-page/list-page-components/currency-list/currency-list.component';
import { ListPageComponent } from './list-page/list-page.component';
import { ListPageNewsListComponent } from './list-page/list-page-components/list-page-news-list/list-page-news-list.component';
import { ListPageListComponent } from './list-page/list-page-components/list-page-list/list-page-list.component';
import { TestComponent } from './test/test/test.component';
import { FaInputComponent } from './test/fa-input/fa-input.component';
import { StockPriceTickerModule } from './stock-price-ticker/stock-price-ticker.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedModule } from './shared.module';
import { ROUTES } from './app.routes';
import { MainPageCryptocurrencyListDataService } from './_services/component-data/main-page/main-page-cryptocurrency-list-data.service';
import { MainPageInfoStockListElementDataAdapter, MainPageInfoForexListElementDataAdapter, MainPageInfoCryptocurrencyListElementDataAdapter } from './_models/main-page-info-list-element-data';
import { QuoteDataService } from './_services/component-data/quote-card/quote-data.service';

export function loadConfig(oauthService: OAuthService) {
  return () => {
    oauthService.issuer = 'https://localhost:5000';
    oauthService.requireHttps = false;
    oauthService.loadDiscoveryDocument();
  };
}

const routerExtraOptions: ExtraOptions = {
  urlUpdateStrategy: "eager"
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,

    TestComponent,
    FaInputComponent,
    ListPageComponent,
    CurrencyListComponent,
    ListPageListComponent,
    ListPageNewsListComponent,
    CryptoCurrencyListComponent,
    ListPageYearRangeComponent,
  ],
  imports: [
    SharedModule.forRoot(),
    MaterialModule,
    OverlayModule,
    OAuthModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    StockPriceTickerModule,

    BrowserAnimationsModule,
    CarouselModule.forRoot(),
    RouterModule.forRoot(ROUTES, routerExtraOptions),
  ],
  providers: [
    AuthService,
    AccountSettingsService,
    AlertifyService,

    { provide: AuthConfig, useValue: authConfig },
    OAuthService,
    QuoteDataService,
    QuoteAdapter,
    ChartPointAdapter,
    QuoteCardAboutDataAdapter,

    MainPageCryptocurrencyListDataService,
    MainPageInfoStockListElementDataAdapter,
    MainPageInfoForexListElementDataAdapter,
    MainPageInfoCryptocurrencyListElementDataAdapter,


    UrlHelperService,

    CacheTransactionsService,
    D3Service,

    DatePipe,
    TwoDecimalPipe,
    SymbolDataAdapter,
    ,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      // added to deal with the limit rating done by the financial data api
      provide: HTTP_INTERCEPTORS,
      useClass: LimitRateInterceptor,
      multi: true,
    },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: loadConfig,
    //   deps: [OAuthService],
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {
  constructor(private oauthService: OAuthService) { }
}