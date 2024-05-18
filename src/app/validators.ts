import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function ukPostcodeValidator(control: AbstractControl): ValidationErrors | null {
  const regex = /^([A-Z]{1,2}[0-9][A-Z0-9]?) ?[0-9][A-Z]{2}$/i;
  const valid = regex.test(control.value);
  return valid ? null : { invalidPostcode: true };
}

export const nannyRequiredIfChildrenNotZero: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  const formGroup = control.parent as FormGroup;
  if (!formGroup) {
    return null; // Don't run the validation if formGroup is not available yet
  }

  const children = formGroup.get('children')?.value;
  const nanny = control.value;

  if (children > 0 && (nanny === undefined || nanny === null || nanny === '')) {
    return { 'nannyRequired': true };
  }

  return null;
};
