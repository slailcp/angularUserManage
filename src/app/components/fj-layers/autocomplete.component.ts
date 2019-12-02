import {Component, OnInit, Input, Output,EventEmitter} from '@angular/core';
@Component({
  selector: 'app-autocomplete',
  template: `
  <div class="cdk-overlay-container-sll" *ngIf="autoIsShow">
  <div class="cdk-overlay-connected-position-bounding-box-sll">
    <div class="cdk-overlay-pane-sll" [ngStyle]="listStyle" (click)="stopPropagation($event)">
        <div class="mat-autocomplete-panel-sll mat-autocomplete-visible-sll"  (click)="selected($event)">
            <ng-content></ng-content>
          </div>
    </div>
   
  </div>
</div>
  `,
  styles: [
    `
    .cdk-overlay-container-sll{position:fixed;z-index:1000;pointer-events:none;top:0;left:0;height:100%;width:100%}
.cdk-overlay-connected-position-bounding-box-sll{top:0px;left:0px;height:100%;width:100%;position:absolute;z-index:1000;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;min-width:1px;min-height:1px}
.cdk-overlay-pane-sll{background-color:#fff;position:absolute;pointer-events:auto;box-sizing:border-box;z-index:1000;display:-webkit-box;display:flex;max-width:100%;max-height:100%;// width:100px;// pointer-events:auto;// top:183px;// left:921.656px}
.mat-autocomplete-panel-sll{box-shadow: -3px 0px 9px #ccc;background-color:#fff;min-width:112px;max-width:280px;overflow:auto;-webkit-overflow-scrolling:touch;visibility:hidden;max-width:none;max-height:256px;position:relative;width:100%;border-bottom-left-radius:4px;border-bottom-right-radius:4px}
.mat-autocomplete-panel-sll.mat-autocomplete-visible-sll{visibility:visible}`
  ]
})
export class AutocompleteComponent implements OnInit {
  autoIsShow:boolean = false;
  listStyle:{width?:string,top?:string,left?:string,'pointer-events'?:string} = {
    width:'0px',
    top:'0px',
    left:'0px',
    'pointer-events':'auto'
  }
  @Input() Dom;
  @Input() Dom2;
  @Output() itemSelected: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
   
    this.Dom.el.nativeElement.onfocus = ()=>{
      this.autoIsShow = true;
      const getPos = this.getPos()
      this.listStyle = {
        'width':`${getPos.width}px`,
        'left':`${getPos.left}px`,
        'top':`${getPos.top+getPos.height}px`,
        'pointer-events': 'auto'
      }
      console.log(this.autoIsShow)
    }
   
    document.addEventListener('click',()=>{
      this.autoIsShow = false;
    })
    
    this.Dom.el.nativeElement.onclick = (event) => {
      this.stopPropagation(event);
    }
    // this.Dom.el.nativeElement.style.backgroundColor = 'red'
  }

  /**点击内部的item,关闭auto */
  selected(event){
    this.autoIsShow = false;
    this.itemSelected.emit(event);
  }

  /* 阻止冒泡 */
  stopPropagation(event) {
        event = event || window.event;
        event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
  }

  getPos() {
    const scrollx = document.documentElement.scrollLeft || document.body.scrollLeft,
        scrollt = document.documentElement.scrollTop || document.body.scrollTop;
        const pos = this.Dom.el.nativeElement.getBoundingClientRect();
    return { 
      top: pos.top + scrollt, 
      right: pos.right + scrollx, 
      bottom: pos.bottom + scrollt, 
      left: pos.left + scrollx,
      width:pos.width, 
      height:pos.height
    }
  }



}
