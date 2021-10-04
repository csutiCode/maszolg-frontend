import { AbstractControl, ValidatorFn, ValidationErrors } from "@angular/forms";


export function createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;
        if (!value) {
            return null;
        }
        const hasUpperCase = /[A-Z]+/.test(value);
        const hasLowerCase = /[a-z]+/.test(value);
        const hasNumeric = /[0-9]+/.test(value);
        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;
        //name of the validator is "passwordStrength", I need to set it on the html template
        return !passwordValid ? {passwordStrength:true}: null;
    }
}

//TODO: FIX THIS SHIT
export function createDateOfBirthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value: Date = control.value;

        if (!value) {
            return null;
        }

        let min = new Date("1950-01-01");

        let current = new Date();
        
        //let max = current.setMonth(current.getMonth() - 218);

        const dateOfBirthValid = control.value >= min // || control.value <= max
        console.log(value)
        console.log(min)
        return !dateOfBirthValid ? {dateOfBirth:true}: null;
    }

}



