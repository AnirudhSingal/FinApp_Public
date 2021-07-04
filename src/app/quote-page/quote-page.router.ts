import { Routes } from '@angular/router';
import { QuotePageComponent } from './quote-page.component';
import { QuoteCardDataResolverService } from '../_resolvers/quote-card/quote-card-data-resolver.service';

export const ROUTES: Routes = [{
    path: '',
    component: QuotePageComponent,
    resolve: {
        quoteCardData: QuoteCardDataResolverService,
    },
}]