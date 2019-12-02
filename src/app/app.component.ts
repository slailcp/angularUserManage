import { Component, Injector, OnDestroy,OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { from } from 'rxjs';
import * as rootReducer from 'src/app/ngrx/reducers/index';
// import { resetState } from 'src/app/ngrx/actions/login-info.action';

import { LoadingComponent } from './components/fj-layers/loading.component';
import { createCustomElement } from '@angular/elements';
// import { PopupComponent } from './components/popup/popup.component';
import { ToastComponent } from './components/fj-layers/toast.component';
import { AlertComponent } from './components/fj-layers/alert.component';
import { ConfirmComponent } from './components/fj-layers/confirm.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demo';
  constructor(
    injector: Injector, 
    private store:Store<rootReducer.State>
    ){
      const LoadElement = createCustomElement(LoadingComponent, {injector});
      customElements.define('loading-element', LoadElement);
  
      const TipElement = createCustomElement(ToastComponent, {injector});
      customElements.define('toast-element', TipElement);
  
      const AlertElement = createCustomElement(AlertComponent, {injector});
      customElements.define('alert-element', AlertElement);
  
      const ConfirmElement = createCustomElement(ConfirmComponent, {injector});
      customElements.define('confirm-element', ConfirmElement);

      this.store.subscribe(item =>{
      console.log(item)
    })
  }

  ngOnInit(){
     //在页面加载时读取sessionStorage里的状态信息
    // if (sessionStorage.getItem("store") ) {
    //   // this.store.dispatch(resetState({payload:JSON.parse(sessionStorage.getItem("store"))}))
    //   // this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    // }
    // //在页面刷新时将vuex里的信息保存到sessionStorage里
    // window.addEventListener("beforeunload",()=>{
    //   this.store.subscribe(item =>{
    //     console.log(item)
    //     sessionStorage.setItem("store",JSON.stringify(item))
    //   })
    // })
  }
  

}
