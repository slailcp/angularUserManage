import {Component, OnInit, Output, Input, EventEmitter} from '@angular/core';

export interface DialogParams {
  title?: string;
  btnCancelMessage?: string;
  btnEnterMessage?: string;
  width?: number | string;
  btnsShow?: boolean;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  dialogStyle: any = {
    width: '650px'
  };

  constructor() {
  }


  @Input() title: string = '提示';
  @Input() btnEnterMessage: string = '确定';
  @Input() btnCancelMessage: string = '取消';
  @Input() btnsShow: boolean | string = true; // 底部按钮组是否显示
  @Input() width: number | string = 650; // dialog宽度


  @Output() closed = new EventEmitter();
  @Output() entered = new EventEmitter();

  close() {
    this.closed.emit();
  }

  enter() {
    this.entered.emit();
  }

  ngOnInit() {
    if (typeof this.btnsShow === 'string') {
      this.btnsShow = this.btnsShow === 'true' ? true : false;
    }
    this.dialogStyle = {
      width: this.width ? this.width + 'px' : '650px'
    };
  }

}
