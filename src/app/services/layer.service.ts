import {Injectable, Output, EventEmitter } from '@angular/core';

import { NgElement, WithProperties } from '@angular/elements';
import { ConfirmParams, ConfirmComponent } from '../components/fj-layers/confirm.component';
import { AlertComponent, AlertParams } from '../components/fj-layers/alert.component';
import { ToastComponent } from '../components/fj-layers/toast.component';
import { LoadingComponent } from '../components/fj-layers/loading.component';


@Injectable({
  providedIn: 'root'
})
export class LayerService{
  constructor() {

	}
 

    
  // this.layerService.confirm('string').then((v) => {
  //   if (v) {console.log('确定')} else {console.log('取消')}
  // })

    // this.layerService.confirm({
    //   title?:string, // title
    //   message:any, // 弹出框的内容
    //  btnCancelMessage?:string, // 自定义取消按钮
    //  btnEnterMessage?:string, // 自定义确定按钮
    //   enterCallback?:Function, // 确定
    //   closeCallback?:Function, // 关闭
    //   completeCallback?:Function // 不管是点击了点击确定或者取消，都会执行此方法
    // })
  confirm(opt: string | ConfirmParams) {
    const confirmEle: NgElement & WithProperties<ConfirmComponent> = document.createElement('confirm-element') as any;
    if (typeof opt === 'string') {
      confirmEle.params = {
       message: opt
     };
    //  confirmEle.addEventListener('closed', () => document.body.removeChild(confirmEle))
    //  confirmEle.addEventListener('enter', () => document.body.removeChild(confirmEle))
     document.body.appendChild(confirmEle);
     return new Promise((resolve, reject) => {
      confirmEle.addEventListener('enter', () => {
        document.body.removeChild(confirmEle);
        resolve(true);
      })
      confirmEle.addEventListener('closed', () => {
        document.body.removeChild(confirmEle);
        resolve(false);
      })
     });
    }

    confirmEle.params = opt;
    confirmEle.addEventListener('closed', (event) => {
      if (opt.closeCallback) {
       const index = opt.closeCallback();
       if (index === undefined) {
         document.body.removeChild(confirmEle);
         return;
       } else {
         console.log('关不掉哦')
       }
      } else {
       document.body.removeChild(confirmEle);
      }
      if (opt.completeCallback) {opt.completeCallback()}
    });
    confirmEle.addEventListener('enter', (event) => {
     if (opt.enterCallback) {
       const index = opt.enterCallback();
       if (index === undefined) {
         document.body.removeChild(confirmEle);
         return;
       } else {
         console.log('关不掉哦')
       }
      } else {
       document.body.removeChild(confirmEle);
      }
      if (opt.completeCallback) {opt.completeCallback()}
    });
    
    document.body.appendChild(confirmEle);
    
}


    // this.layerService.alert('string')；
    // this.layerService.alert({
    //   title?:string, // title
    //   message:any, // 弹出框的内容
    //   btnMessage?:string, // 自定义确定按钮
    //   enterCallback?:Function, // 确定
    //   closeCallback?:Function, // 关闭
    //   completeCallback?:Function // 不管是点击了点击确定或者取消，都会执行此方法
    // })

 alert(opt: string | AlertParams) {
     const alertEle: NgElement & WithProperties<AlertComponent> = document.createElement('alert-element') as any;
     if (typeof opt === 'string') {
      alertEle.params = {
        message: opt
      };
      alertEle.addEventListener('closed', () => document.body.removeChild(alertEle))
      alertEle.addEventListener('enter', () => document.body.removeChild(alertEle))
      document.body.appendChild(alertEle);
       return;
     }

     alertEle.params = opt;
     alertEle.addEventListener('closed', (event) => {
       if (opt.closeCallback) {
        const index = opt.closeCallback();
        if (index === undefined) {
          document.body.removeChild(alertEle);
          return;
        } else {
          console.log('关不掉哦')
        }
       } else {
        document.body.removeChild(alertEle);
       }
       if (opt.completeCallback) {opt.completeCallback()}
     });
     alertEle.addEventListener('enter', (event) => {
      if (opt.enterCallback) {
        const index = opt.enterCallback();
        if (index === undefined) {
          document.body.removeChild(alertEle);
          return;
        } else {
          console.log('关不掉哦')
        }
       } else {
        document.body.removeChild(alertEle);
       }
       if (opt.completeCallback) {opt.completeCallback()}
     });
     
     document.body.appendChild(alertEle);
     
 }



  showToast(msg: string, time?: number) {
    const toastEle: NgElement & WithProperties<ToastComponent> = document.createElement('toast-element') as any;
    toastEle.message = msg;
    document.body.appendChild(toastEle);
    setTimeout(() => {
      this.hideToast(toastEle);
    },time*1000? time*1000: 3000)
    return toastEle;
  }

  hideToast(toastEle?: (NgElement & WithProperties<ToastComponent>) | string) {
    // 删除所有
    if (typeof toastEle === 'string' || !toastEle) {
      const eles = document.querySelectorAll('toast-element');
      if (eles.length) {eles.forEach(ele =>document.body.removeChild(ele));}
      return;
    }

    // 删除指定的某一个
    const eles = document.querySelectorAll('toast-element');
    if (eles.length) {
      eles.forEach(ele => {
        ele === toastEle?document.body.removeChild(ele):''
      });
    } 
    
  }



  showLoading() {
    const loadEle: NgElement & WithProperties<LoadingComponent> = document.createElement('loading-element') as any;
    // loadEle.id = `${parseInt(`${Math.random()*10000}`)}`
    // console.log(loadEle.id)
    document.body.appendChild(loadEle);
    return loadEle;
  }

  hideLoading(loadEle?: (NgElement & WithProperties<LoadingComponent>) | string) { // loadEle:打开的那个load,'all':所有,不传参数的时候代表关闭所有
    if (typeof loadEle === 'string' || !loadEle) {
      const eles = document.querySelectorAll('loading-element');
      if (eles.length) {eles.forEach(ele =>document.body.removeChild(ele));}
      return;
    }

    // const eles = document.querySelectorAll('loading-element');
    // if (eles.length) {
    //   eles.forEach(ele => {
    //     ele === loadEle?document.body.removeChild(ele):''
    //   });
    // } 
    // console.log(loadEle)
    document.body.removeChild(loadEle)  
  
  
  
  }



}
