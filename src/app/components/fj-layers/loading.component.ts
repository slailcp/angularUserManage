import { Component, OnInit, Input,EventEmitter, Output, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
  <div class="loading-wrap">
  <div class="load-text">
    <ng-content></ng-content>
  </div>
</div>
`,
styles: [`
.loading-wrap{
  position: fixed;
  top:0;
  right:0;
  bottom:0;
  left:0;
  z-index: 100;
  background: rgba(0,0,0,0.5);
  color:#fff;
}
.loading-wrap .load-text{
position: absolute;
top:50%;
left:50%;
width:200px;
height:90px;
margin: -65px 0 0 -100px;
padding-top:115px;
font-size: 12px;
text-align: center;
background-image:url(../../../assets/load.gif);
background-repeat: no-repeat; 
background-position: center 0; 
}
`]
})
export class LoadingComponent implements OnInit {
  

  constructor() {  }

  ngOnInit() {
    
  }
  
  

}
