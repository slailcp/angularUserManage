
import { Directive, ElementRef, HostListener, Input,OnInit } from '@angular/core';

@Directive({
  selector: '[appFjAutocomplete]',
  exportAs:'app-fj'
})
export class FjAutocompleteDirective implements OnInit {
  @Input('appFjAutocomplete') fjAutocomplete: string; // 传进来的方式--目前还没有加功能

  el:ElementRef
  autoIsShow:boolean = false
  constructor(el: ElementRef) {
     this.el = el;
    
  }

  ngOnInit(){
    console.log(this.fjAutocomplete)
  }



}
