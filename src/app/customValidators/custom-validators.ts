// validators/banking.validators.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validates IFSC code format: 4 letters + 0 + 6 alphanumeric
export function ifscValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (!value) return null; // empty — let 'required' handle that

    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return ifscRegex.test(value) ? null : { invalidIfsc: true };
    // null = valid, object = invalid (key becomes the error name)
  };
}

// Validates minimum transfer amount based on transfer type (RBI rules)
export function minTransferAmountValidator(transferTypeControl: AbstractControl): ValidatorFn {
  return (amountControl: AbstractControl): ValidationErrors | null => {
    const amount = amountControl.value as number;
    const type = transferTypeControl.value as string;

    if (type === 'RTGS' && amount < 200000) {
      return { rtgsMinAmount: { required: 200000, actual: amount } };
    }
    return null;
  };
}

// Cross-field validator — checks two fields against each other
// Applied at FormGroup level, not FormControl level
export function accountNotSameValidator(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const from = group.get('fromAccount')?.value;
    const to = group.get('beneficiaryAccount')?.value;
    return from && to && from === to ? { sameAccount: true } : null;
  };
}

//validator for no special char allowed
export function noSpecialCharactersValidator(): ValidatorFn {
  return (charControl: AbstractControl): ValidationErrors | null => {
    const value = charControl.value as string;
    if (!value) return null; // empty — let 'required' handle that
    const charRegex = /[^a-zA-Z0-9\s]/; // : Wrapped in forward slashes

    // Returns error object if a special character is found, otherwise returns null
    return charRegex.test(value) ? { isSpecialChar: true } : null;
  };
}
