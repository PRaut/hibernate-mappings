import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export function uniqueEmailValidator(param1: any, param2: any[]): ValidatorFn {
    return (form: FormGroup): {[key: string]: boolean } | null => {
        const email = form.get(param1).value;
        const emails = param2;

        if (emails.includes(email)) {
               const err = { duplicateEmail: true };
               form.get(param1).setErrors(err);
               return err;
           } else {
               // below code is for deleting error message from screen
               const duplicateEmailError = form.get(param1).hasError('duplicateEmail');
               if (duplicateEmailError) {
                   delete form.get(param1).errors.duplicateEmail;
                   form.get(param1).updateValueAndValidity();
               }
            }
    };
}