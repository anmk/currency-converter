import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { catchError, first, Subscription } from 'rxjs';

import { SelectExchangeRateDateComponent } from './select-exchange-rate-date/select-exchange-rate-date.component';
import { CurrencyDataService } from '../services/currency-data.service';
import { CurrencyData } from '../models/currency-data.model';

@Component({
  selector: 'app-display-exchange-rates',
  standalone: true,
  imports: [SelectExchangeRateDateComponent, CommonModule, DisplayExchangeRatesComponent],
  providers: [DatePipe],
  templateUrl: './display-exchange-rates.component.html',
  styleUrl: './display-exchange-rates.component.css'
})
export class DisplayExchangeRatesComponent implements OnInit {
  currentDate!: string | null
  pastDate!: string;
  displayDate!: string | null;
  currencyData!: CurrencyData[];
  subscription!: Subscription;
  private currencyDataService = inject(CurrencyDataService);
  private readonly datepipe = inject(DatePipe);

  ngOnInit() {
    this.getCurrencyData();
  }

  transformDate(date: Date): void {
    this.currentDate = this.datepipe.transform(date, 'yyyy-MM-dd');
  }

  transformDateToDisplay(date: string): void {
    this.displayDate = this.datepipe.transform(date, 'dd/MM/yyyy');
  }

  getCurrencyData(): void {
    this.displayDate = '';
    const date = new Date();
    this.transformDate(date);
    this.getData(this.currentDate);
  }

  getPastData(): void {
    this.displayDate = '';
    this.getData(this.pastDate);
    this.currencyData = [];
  }

  getData(date: string | null): void {
    if (date) {
      this.subscription = this.currencyDataService.get_currencies(date)
      .pipe(
        first(),
        catchError(() => []))
        .subscribe((res: any) => {
          this.currencyData = res;
          this.transformDateToDisplay(date);
      });
    }
  }

  onShownDate(date: string): void {
    this.pastDate = date;
    this.getPastData();
  }

}
