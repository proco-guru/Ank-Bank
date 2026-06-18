import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskedAccountPipe',
  standalone: true,
})
export class MaskedAccountPipe implements PipeTransform {
  transform(amount: string, visibleDigits: number = 4): string {
    if (!amount) return '';

    // 2. If the string is shorter than the skip count, return it unmasked
    if (amount.length <= visibleDigits) return amount;

    // 3. Extract the visible trailing digits
    const lastNumbers = amount.substring(amount.length - visibleDigits);

    // 4. Correctly repeat the 'X' string, not the full account number
    const maskValues = 'X'.repeat(amount.length - visibleDigits);

    return maskValues + lastNumbers;
  }
}
