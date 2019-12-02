import { Component, OnInit, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  template: `
  <div class="tips">
    <span class="tip">{{message}}</span>
  </div>
`,
  styles: [`
  .tips {
    position: fixed;
    top: 50%;
    left: 50%;
    bottom: 0;
    width:300px;
    z-index: 120;
    height:100px;
    margin-left:-150px;
    margin-top:-50px;
    background: rgba(0, 0, 0, 0);
    text-align: center;
  }
  
  .tip {
    display: inline-block;
    max-width: 300px;
    padding: 10px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.5);
    line-height: 18px;
    color: #fff;
    font-size: 12px;
  }
  `]
})

export class ToastComponent implements OnInit {
  _message: string;
  @Input()
  set message(message: string) {
    this._message = message;
  }
  get message(): string { return this._message; }

  constructor() {}

  ngOnInit() {
  }

  handleAction() {
    
  }

}
