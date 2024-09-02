import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, first } from 'rxjs';

import { SelectExchangeRateDateComponent } from '../shared/select-exchange-rate-date/select-exchange-rate-date.component';
import { CurrencyDataService } from '../services/currency-data.service';
import { CurrencyData } from '../models/currency-data.model';

@Component({
  selector: 'app-display-exchange-rates',
  standalone: true,
  imports: [SelectExchangeRateDateComponent, CommonModule, DisplayExchangeRatesComponent],
  templateUrl: './display-exchange-rates.component.html',
  styleUrl: './display-exchange-rates.component.css'
})
export class DisplayExchangeRatesComponent implements OnInit {
  currentDate!: string | null
  pastDate!: string;
  displayDate!: string | null;
  currencyData!: CurrencyData[];
  private currencyDataService = inject(CurrencyDataService);

  ngOnInit() {
    this.getCurrencyData();
  }

  getCurrencyData(): void {
    this.displayDate = '';
    const date = new Date();
    this.currentDate = this.currencyDataService.transformDate(date);
    this.getData(this.currentDate);
  }

  getData(date: string | null): void {
    if (date) {
      this.currencyDataService.getCurrencies(date)
      .pipe(
        first(),
        catchError(() => []))
        .subscribe((res: any) => {
          this.currencyData = res;
          this.displayDate = this.currencyDataService.transformDateToDisplay(date);
      });
    }
    this.currencyData = [];
  }

  onShownDate(date: string): void {
    this.pastDate = date;
    this.getData(date);
  }

}
