import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, DatePipe } from '@angular/common';
import { Subject, catchError, first, takeUntil } from 'rxjs';

import { CurrencyDataService } from '../services/currency-data.service';
import { ConversionFormComponent } from './conversion-form/conversion-form.component';
import { CurrencyData } from '../models/currency-data.model';

@Component({
  selector: 'app-currency-conversion',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule, ConversionFormComponent],
  providers: [DatePipe],
  templateUrl: './currency-conversion.component.html',
  styleUrl: './currency-conversion.component.css',
})
export class CurrencyConversionComponent implements OnInit, OnDestroy {
  currencyData!: CurrencyData[];
  currentRateDate!: string | null;
  displayRateDate!: string | null;
  currencyFormGroup!: FormGroup;
  convertedAmount!: number;
  private convertFromCurrency!: number;
  private convertToCurrency!: number;
  private calculatedAmount!: number;
  private destroy$ = new Subject<void>();
  private currencyDataService = inject(CurrencyDataService);
  private readonly datepipe = inject(DatePipe);

  ngOnInit() {
    this.getData();
    this.currencyForm();
    this.getFormValues();
  }

  transformDate(date: Date): void {
    this.currentRateDate = this.datepipe.transform(date, 'yyyy-MM-dd');
  }

  transformDateToDisplay(date: Date): void {
    this.displayRateDate = this.datepipe.transform(date, 'dd/MM/yyyy');
  }

  getData(): void {
    const date = new Date();
    this.transformDate(date);
    this.transformDateToDisplay(date);
    if(this.currentRateDate){
      this.currencyDataService.get_currencies(this.currentRateDate)
      .pipe(
        first(),
        catchError(() => [])
      ).subscribe((res: any) => {
        this.currencyData = res;
      });
    }
  }

  currencyForm(): FormGroup {
    return this.currencyFormGroup = new FormGroup({
      fromCurrency: new FormControl('', Validators.required),
      toCurrency: new FormControl('', Validators.required)
    });
  }

  getFormValues(): void {
      this.currencyFormGroup.controls['fromCurrency']
      .valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
      this.convertFromCurrency = value;
    });
      this.currencyFormGroup.controls['toCurrency']
      .valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
      this.convertToCurrency = value;
    });
  }

  convertingAmounts(): void {
    this.convertToResultCurrency(
      +this.convertFromCurrencyToValue(
        +this.calculatedAmount,
        +this.convertFromCurrency),
      +this.convertToCurrency
    );
  }

  convertFromCurrencyToValue(...args: number[]): number {
    return +args.reduce((prevVal: number, val: number) => (prevVal * val))
  }

  convertToResultCurrency(...args: number[]): void {
    this.convertedAmount = +args.reduce((prevVal: number, val: number) => (prevVal / val)).toFixed(4)
  }

  addOrder(amount: any): void {
   this.calculatedAmount = amount;
   this.convertingAmounts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
		this.destroy$.complete();
  }

}
