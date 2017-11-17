import { Directive, Input, forwardRef } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

const MIN_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MinNumValidator),
    multi: true
};

@Directive({
    selector: '[min][ngModel]',
    providers: [MIN_VALIDATOR]
})
export class MinNumValidator implements Validator {
    @Input() min: string;

    validate(control: AbstractControl): { [key: string]: any } {
        if (this.min != null) {
            const min = Number.parseInt(this.min, 10);
            return control.value >= min ? null : {'min': `${this.min} 이상의 값을 입력하세요!`};
        }
        return null;
    }
}

const MAX_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MaxNumValidator),
    multi: true
};

@Directive({
    selector: '[max][ngModel]',
    providers: [MAX_VALIDATOR]
})
export class MaxNumValidator implements Validator {
    @Input() max: string;

    validate(control: AbstractControl): { [key: string]: any } {
        if (this.max != null) {
            const max = Number.parseInt(this.max, 10);
            return control.value <= max ? null : { 'max': `${this.max} 이하의 값을 입력하세요!`};
        }
        return null;
    }
}



export const CUSTOM_VALIDATOR: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => CustomValidator),
    multi: true
};

@Directive({
    selector: '[myOwnValidate][ngModel]',
    providers: [CUSTOM_VALIDATOR]
})
export class CustomValidator implements Validator {
    validate(control: AbstractControl): { [key: string]: any } {
        return null;
    }
}
