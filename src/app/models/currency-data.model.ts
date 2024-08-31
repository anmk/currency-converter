import { Rate } from "./rate.model";

export interface CurrencyData {
  effectiveDate: string;
  no: string;
  rates: Rate[];
  table: string;
}

