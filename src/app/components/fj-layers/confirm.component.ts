import { Component, OnInit,Inject,Input ,Output,EventEmitter} from '@angular/core';

export interface ConfirmParams{
    title?:string,
    message:any,
    btnCancelMessage?:string,
    btnEnterMessage?:string,
    width?:number|string,
    enterCallback?:Function,
    closeCallback?:Function,
    completeCallback?:Function
}

@Component({
  selector: 'app-confirm',
  template: `
    <div class="alert-wraper-bg">
        <div class="alert-wraper" [ngStyle]="confirmStyle">
           <div style="width:100%">
                <h1 class="dialog-title">{{title}}</h1>
                <div class="content">{{message}}</div>
                <div style="text-align: center;">
                <button class="enter" type="button" (click)="enter.next()">{{btnEnterMessage}}</button>
                <button class="close" type="button" (click)="closed.next()">{{btnCancelMessage}}</button>
                </div>
           </div>
        </div>
    </div>
  `,
  styles: [`
  .alert-wraper-bg{position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,0.6);z-index:99;justify-content:center;align-items:center;display:flex}
.alert-wraper{background:#fff;max-width:80vw;display:block;padding:24px;border-radius:4px;box-sizing:border-box;overflow:auto;outline:0;min-height:inherit;max-height:inherit;display:flex}
.content{min-height:35px;min-width:180px;text-align:center;font-size:16px;padding-top:20px;padding-bottom:15px;}
.dialog-title{font-size:16px;font-weight:bold}
h1 .c{float:right;font-size:32px;color:#999;cursor:pointer}
.enter,.close{min-width:80px;min-height:30px;line-height:30px;color:#fff;background:#2ca3ff;border:0;border-radius:3px;padding:0 10px;text-align:center;cursor:pointer;margin:auto}
.close{background:#fafafa;margin-left:20px;color:#333}

  `]
})

export class ConfirmComponent implements OnInit {
  title:string = '提示';
  message:any = '';
  btnEnterMessage:string = '确定';
  btnCancelMessage:string = '取消';
  confirmStyle:any = {
    width:'250px'
  }
  constructor() {
    
   }

  
   @Input()
   set params(params: ConfirmParams) {this._params = params;}
   get params(): ConfirmParams { return this._params; }
   _params
  

   @Output()
   closed = new EventEmitter();

   @Output()
   enter = new EventEmitter();

  ngOnInit() {
    // setTimeout(()=>{
    //   console.log(this.params)
    // },1000)
    if(typeof this.params === 'string'){ // 默认信息；
      this.message =this.params;
    }else{
      this.title = this.params.title?this.params.title:'提示';
      this.message = this.params.message;
      this.btnEnterMessage = this.params.btnEnterMessage?this.params.btnEnterMessage:'确定';
      this.btnCancelMessage = this.params.btnCancelMessage?this.params.btnCancelMessage:'取消';
      this.confirmStyle = {
        width:this.params.width?this.params.width+'px':'250px'
      }
    }
  }


}
