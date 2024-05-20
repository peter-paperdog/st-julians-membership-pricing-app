import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormatter'
})
export class CurrencyFormatterPipe implements PipeTransform {

  transform(value: number): string {
    if (value === null || value === undefined) return '';

    // Create a new Intl.NumberFormat object to format the value as currency
    const formatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(value);
  }
}
