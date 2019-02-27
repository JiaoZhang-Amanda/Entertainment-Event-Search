import { Directive, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn, ValidationErrors, Validators } from '@angular/forms';


export function forbiddenNameValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | {[key: string]: any} => {
    const forbidden = (control.value.replace(/\s+/g,"") === "");
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}

@Directive({
  selector: '[appNoneSpace]',
  providers: [{provide: NG_VALIDATORS, useExisting: NoneSpaceDirective, multi: true}]

})


export class NoneSpaceDirective implements Validator{
  @Input('appNoneSpace') keyword: string;

  validate(control: AbstractControl):  {[key: string]: any} | null {
    providers: [{provide: NG_VALIDATORS, useExisting: NoneSpaceDirective, multi: true}]
    return this.keyword ? forbiddenNameValidator()(control)
    : null;
    }
  constructor() { }
  
}
