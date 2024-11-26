import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(amount: number): string {
    return amount.toFixed(2) + '€';
  }

}
