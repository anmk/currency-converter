import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CurrencyConversionComponent } from './currency-conversion/currency-conversion.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'conversion', component: CurrencyConversionComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];
