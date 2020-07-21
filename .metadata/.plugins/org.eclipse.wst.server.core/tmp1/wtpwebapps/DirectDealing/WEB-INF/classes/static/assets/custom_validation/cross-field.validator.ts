import { ValidatorFn, FormGroup } from '@angular/forms';

export function crossFieldValidator(param1: any, param2: any): ValidatorFn {
    return (form: FormGroup): {[key: string]: boolean } | null => {
        const oldValue = form.get(param1).value;
        const newValue = form.get(param2).value;

        if (!(oldValue === newValue)) {
               const err = { misMatch: true };
               form.get(param1).setErrors(err);
               form.get(param2).setErrors(err);
               return err;
        }
    };
}

export function arrayValidator(param1: any, param2: any): ValidatorFn {
    return (form: FormGroup): {[key: string]: boolean } | null => {
        const oldValue = form.get(param1).value;
        const newValue = form.get(param2).value;
        // console.log(oldValue, newValue);
        if (!(JSON.stringify(oldValue) === JSON.stringify(newValue))) {
               const err = { misMatch: true };
               console.log(err);
               form.get(param1).setErrors(err);
               form.get(param2).setErrors(err);
               return err;
        }
    };
}
