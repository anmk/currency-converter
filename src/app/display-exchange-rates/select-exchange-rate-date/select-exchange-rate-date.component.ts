import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-select-exchange-rate-date',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, ReactiveFormsModule],
  providers: [provideNativeDateAdapter(), DatePipe, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }], // You can change the locale, e.g. to 'pl-PL' or another.
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './select-exchange-rate-date.component.html',
  styleUrl: './select-exchange-rate-date.component.css'
})
export class SelectExchangeRateDateComponent implements OnInit, OnDestroy {
  @Output() shownDate: EventEmitter<string> = new EventEmitter<string>();
  dateFormGroup!: FormGroup;
  public rateDate!: string | null;
  private destroy$ = new Subject<void>();
  private readonly datepipe = inject(DatePipe);

  ngOnInit() {
    this.dateForm();
    this.getFormValues();
  }

  dateForm(): FormGroup {
    return this.dateFormGroup = new FormGroup({
      rateDate: new FormControl('', Validators.required)
    });
  }

  transformDate(date: Date): void {
    this.rateDate = this.datepipe.transform(date, 'yyyy-MM-dd');
  }

  getFormValues(): void {
    this.dateFormGroup.controls['rateDate']
    .valueChanges
    .pipe(takeUntil(this.destroy$))
    .subscribe(value => {
      this.transformDate(value)
      this.showDate();
    });
  }

  private showDate(): void {
    if (this.rateDate ) {
      this.shownDate.emit(this.rateDate);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
		this.destroy$.complete();
  }

}
