import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidatorFn } from '@angular/forms';
 
// 校验的方法
// nameRe:传进来的正则
// control:当前需要校验的control元素，例如<input appForbiddenName="bob" .../> 
// 校验结果：如果传入的是bob则校验通不过
function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {'forbiddenName': {value: control.value}} : null;
    };
  }
 
@Directive({
  selector: '[appForbiddenName]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})
export class ForbiddenValidatorDirective implements Validator {
    @Input('appForbiddenName') forbiddenName: string;
 
    validate(control: AbstractControl): {[key: string]: any} | null {
      // 如果有传入forbiddenName，就调用forbiddenNameValidator()方法校验，并返回校验结果，否则返回null
      return this.forbiddenName ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
                                : null;
    }
} //