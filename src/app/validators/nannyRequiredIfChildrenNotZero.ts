import {AbstractControl, FormGroup, ValidatorFn} from "@angular/forms";

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
