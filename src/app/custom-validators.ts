import { Directive, Input, forwardRef, OnInit } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS, ValidatorFn } from '@angular/forms';

export class NumberRangeValidator {
    static min(min: number) {
        return (control: AbstractControl): { [key: string]: any } => {
                return control.value >= min ? null : { 'min': `${min} 이상의 값을 입력하세요` };
            };
    }

    static max(max: number) {
        return (control: AbstractControl): { [key: string]: any } => {
            return control.value <= max ? null : { 'max': `${max} 이하의 값을 입력하세요` };
        };
    }
}

const MIN_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MinNumValidator),
    multi: true
};

@Directive({
    selector: '[min][ngModel]',
    providers: [MIN_VALIDATOR]
})
export class MinNumValidator implements OnInit, Validator {
    @Input() min: string;
    private _validator: ValidatorFn;

    constructor() {
    }

    ngOnInit() {
        this._validator = NumberRangeValidator.min(parseInt(this.min, 10));
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.min != null ? this._validator(control) : null;
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
export class MaxNumValidator implements OnInit, Validator {
    @Input() max: string;
    private _validator: ValidatorFn;

    constructor() {
    }

    ngOnInit() {
        this._validator = NumberRangeValidator.max(parseInt(this.max, 10));
    }

    validate(control: AbstractControl): { [key: string]: any } {
        return this.max != null ? this._validator(control) : null;
    }
}
