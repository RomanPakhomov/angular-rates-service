import { AbstractControl, ValidatorFn } from "@angular/forms";

export function forbittenFieldValidator(nameRegexp: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
        return !nameRegexp.test(control.value)
            ? {forbiddenField: {value: control.value}}
            : null;
    }
}