import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { IndexesChartsDataResolverService } from './_resolvers/main-page/indexes-charts-data-resolver.service';
import { ListPageComponent } from './list-page/list-page.component';
import { ListPageType } from './_enums/list-page-type';

export const ROUTES : Routes = [
    {
  
      path: '',
      component: MainPageComponent,
      loadChildren: () => import('./main-page/main-page.module').then(mod => mod.MainPageModule),
      resolve: {
        graphData: IndexesChartsDataResolverService, // temporary. resolves the symbols for which graph will be plotted
      },
      data: {
        routeName: "MainPage"
      }
    },
    {
      path: 'quote/:symbol',
      loadChildren: ()=> import('./quote-page/quote-page.module').then(mod => mod.QuotePageModule),
      data: {
        routeName: "QuotePage"
      }
    },
    {
      path: 'active-stocks',
      component: ListPageComponent,
      data: {
        ListType: ListPageType.Actives
      }
    },
    {
      path: 'stock-gainers',
      component: ListPageComponent,
      data: {
        ListType: ListPageType.Gainers
      }
    },
    {
      path: 'stock-losers',
      component: ListPageComponent,
      data: {
        ListType: ListPageType.Losers
      }
    },
    {
      path: 'currencies',
      component: ListPageComponent,
      data: {
        ListType: ListPageType.Currencies
      }
    },
    {
      path: 'crypto-currencies',
      component: ListPageComponent,
      data: {
        ListType: ListPageType.CryptoCurrencies
      }
    },
  ];