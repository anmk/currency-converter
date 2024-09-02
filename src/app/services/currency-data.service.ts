import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable, tap } from 'rxjs';

import { CurrencyData } from '../models/currency-data.model';


@Injectable({
  providedIn: 'root',
})
export class CurrencyDataService {

  baseUrl: string = 'https://api.nbp.pl/api/exchangerates/tables/a/';

  constructor(private httpClient: HttpClient, private readonly datepipe: DatePipe) {}

  getCurrencies(date: string): Observable<Object> {
    return this.httpClient.get<CurrencyData[]>(this.baseUrl + date).pipe(
      tap({
        error: e => console.log(e)
      }),
    )
  }

  transformDate(date: Date): string | null {
    return this.datepipe.transform(date, 'yyyy-MM-dd');
  }

  transformDateToDisplay(date: string): string | null {
    return this.datepipe.transform(date, 'dd/MM/yyyy');
  }

}
