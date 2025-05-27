import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function priceMaximumValidator(maximum: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isLess = control.value < maximum;
        return isLess ? null : { priceMaximum: true }
    };
}