import { Component, OnInit,Inject,Input ,Output,EventEmitter} from '@angular/core';

export interface AlertParams{
    title?:string,
    message:any,
    btnMessage?:string,
    width?:number|string,
    enterCallback?:Function,
    closeCallback?:Function,
    completeCallback?:Function
}

@Component({
  selector: 'app-alert',
  template: `
    <div class="alert-wraper-bg">
        <div class="alert-wraper" [ngStyle]="alertStyle">
           <div style="width:100%">
                <h1 class="dialog-title">{{title}} <span class="fr c" (click)="closed.next()">×</span> </h1>
                <div class="content">{{message}}</div>
                <div style="text-align: center;">
                    <button class="close" type="button" (click)="enter.next()">{{btnMessage}}</button>
                </div>
           </div>
        </div>
    </div>
  `,
  styles: [`
  .alert-wraper-bg{position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,0.6);z-index:99;
    justify-content: center;
    align-items: center;display:flex;
}
  .alert-wraper{background:#fff;max-width: 80vw;
    display: block;
    padding: 24px;
    border-radius: 4px;
    box-sizing: border-box;
    overflow: auto;
    outline: 0;
    min-height: inherit;
    max-height: inherit;
    display: flex;
    }

  .content{
    min-height:35px;
    min-width: 180px;
    text-align: center;
    font-size:16px;
    padding-top:20px;
    padding-bottom:15px;
}
.dialog-title{font-size:16px;font-weight:bold;}
h1 .c {
  float: right;
  font-size: 32px;
  color: #999;
  cursor: pointer;
}
.enter,.close{
    min-width: 80px;
    min-height:30px;
    line-height: 30px;
    color: #fff;
    background: #2ca3ff;
    border:0;
    border-radius: 3px;
    padding: 0 10px;
    text-align: center;
    cursor: pointer;
    margin:auto;
}

  `]
})

export class AlertComponent implements OnInit {
  title:string = '提示';
  message:any = '';
  btnMessage:string = '确定';
  alertStyle:any = {
    width:'250px'
  }
  constructor() {
    
   }

  
   @Input()
   set params(params: AlertParams) {this._params = params;}
   get params(): AlertParams { return this._params; }
   _params
  

   @Output()
   closed = new EventEmitter();

   @Output()
   enter = new EventEmitter();

  ngOnInit() {

    if(typeof this.params === 'string'){ // 默认信息；
      this.message =this.params;
    }else{
      this.title = this.params.title?this.params.title:'提示';
      this.message = this.params.message;
      this.btnMessage = this.params.btnMessage?this.params.btnMessage:'确定';
      this.alertStyle = {
        width:this.params.width?this.params.width+'px':'250px'
      }
    }
   
  }


}
