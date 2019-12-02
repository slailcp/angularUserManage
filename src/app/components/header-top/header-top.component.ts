import { Component } from '@angular/core';
import { Store,select } from '@ngrx/store';
import * as rootReducer from 'src/app/ngrx/reducers/index';
import * as loginInfoReducer from 'src/app/ngrx/reducers/login-info.reducer';
import { Observable } from 'rxjs';
import { CacheService } from 'src/app/utils/cache.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router'
import { LayerService } from 'src/app/services/layer.service';


@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.css']
})
export class HeaderTopComponent {
  loginInfo$: Observable<loginInfoReducer.State>
  username$: Observable<string>
  description$: Observable<string>
  userInfo: any
  constructor(private store: Store<rootReducer.State>,
    private cacheService: CacheService,
    private loginService: LoginService,
    private router: Router,
    private layerService: LayerService
    ) {
    // 获取所有登陆信息
    this.loginInfo$ = store.pipe(select('loginInfo'));
    // this.loginInfo$.subscribe(item =>console.log(item))

    // 获取用户姓名
    this.username$ = store.pipe(select(rootReducer.selectUsername()));
    // this.description$ = store.pipe(select(loginInfoReducer.selectdescription()));

    this.userInfo = this.cacheService.get(this.cacheService.key.userInfo);

  }

  onLoginOut() {
      this.layerService.confirm('是否退出').then((v) => {
        if (v) {
          const loading = this.layerService.showLoading()
          setTimeout(() => {
            this.cacheService.clear();
            this.router.navigate(['/login']);
            this.layerService.hideLoading(loading);
          }, 1000)
        } else {
          console.log('不推出！')
        }
      })

  }
}
