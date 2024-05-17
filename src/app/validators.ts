import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ukPostcodeValidator(control: AbstractControl): ValidationErrors | null {
  const regex = /^([A-Z]{1,2}[0-9][A-Z0-9]?) ?[0-9][A-Z]{2}$/i;
  const valid = regex.test(control.value);
  return valid ? null : { invalidPostcode: true };
}
