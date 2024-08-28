import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { CurrencyData } from '../models/currency-data.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyDataService {

  baseUrl: string = 'https://api.nbp.pl/api/exchangerates/tables/a/';

  constructor(private httpClient: HttpClient) {}

  get_currencies(date: string): Observable<Object> {
    return this.httpClient.get<Array<CurrencyData>>(this.baseUrl + date).pipe(
      tap({
        error: e => console.log(e),
      }),
    )
  }

}
