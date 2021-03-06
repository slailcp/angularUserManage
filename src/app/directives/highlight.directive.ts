import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  el:ElementRef
    constructor(el: ElementRef) {
       this.el = el;
    }
    @Input('appHighlight') highlightColor: string;

    @HostListener('mouseenter') onMouseEnter() {
       this.highlight(this.highlightColor || 'red');
    }
    
    @HostListener('mouseleave') onMouseLeave() {
      this.highlight(null);
    }
    
    private highlight(color: string) {
      this.el.nativeElement.style.backgroundColor = color;
    }
}