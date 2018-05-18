import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[numberValidator][formControlName],[numberValidator][formControl],[numberValidator][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => NumberValidator), multi: true }
  ]
})
export class NumberValidator implements Validator {

  constructor() { }
  
  validate(c: AbstractControl): { [key: string]: any } {

    if (c.value !== undefined && c.value === null) {
      return { 'notNumberError': true }
    }
    
    return null;
  }

}
