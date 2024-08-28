import { Component } from '@angular/core';

import { DisplayExchangeRatesComponent } from '../display-exchange-rates/display-exchange-rates.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ DisplayExchangeRatesComponent ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
