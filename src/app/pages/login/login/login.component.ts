import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {  Router } from '@angular/router';
import {  from, of, combineLatest } from 'rxjs';
import {  filter, switchMap, combineAll } from 'rxjs/operators';

import { getLoginInfo } from 'src/app/ngrx/actions/login-info.action';
import * as rootReducer from 'src/app/ngrx/reducers/index';
import { UserService } from 'src/app/services/user.service';
import { format } from 'util';
import { LoginService } from 'src/app/services/login.service';
import { CacheService } from 'src/app/untils/cache.service';
import * as dayjs from 'dayjs';
import { LayerService } from 'src/app/services/layer.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    username: string = '小乔';
    password: string = 'diaochan';
    constructor(
        private store: Store<rootReducer.State>,
        private router: Router,
        private loginService: LoginService,
        private cacheService: CacheService,
        private layerService: LayerService
        ) {}

    ngOnInit() {
        console.log(dayjs().valueOf())
        // if (/\/login/.test(url)) { // 如果有登录信息

        // }
        // this.userService.login().subscribe(item =>console.log(item))
        // this.cookieService.get('rememberMe')
    }

    onSubmitMock() {
        
        const params = {
            'accountUser': this.username,//- （String） 用户账号
            'accountPwd': this.password ,  //（String） 用户密码
            'rememberMe': true, //（Boolean） 是否记住用户标志
        }
        if (!this.username || !this.password) { 
            this.layerService.alert('账号或者密码错误不能为空')
            return;
        }
        const loading = this.layerService.showLoading();
        this.loginService.mockLoginGoTo(params).subscribe(item => {
            console.log(item)
            this.layerService.hideLoading(loading)
            if (item.length) {
                // localStorage.setItem('token',item.userId);
                // const loginInfo:any = {
                //     username:item[0].username,
                //     id:item[0].id,
                // }
                this.cacheService.set(this.cacheService.key.loginInfo,item[0],this.cacheService.key.loginDateRange);
                this.cacheService.set(this.cacheService.key.userInfo,item[0],this.cacheService.key.loginDateRange);
                this.getInfo(item[0]);
                this.router.navigate(['/manage']);
                
            } else {
                this.layerService.showToast('账号或者密码错误')
            }
        })
    }

    // onSubmitFx() {
       
    //     const params = {
    //         'accountUser':this.username,//- （String） 用户账号
    //         'accountPwd':this.password ,  //（String） 用户密码
    //         'rememberMe':true, //（Boolean） 是否记住用户标志
    //     }
    //     if (!this.username || !this.password) { 
    //         // this.router.navigate(['/manage']);
    //         this.layerService.alert('账号或者密码错误不能为空');
    //         return;
    //     }
    //     const loading = this.layerService.showLoading();
    //     this.loginService.fxLoginGoTo(params).subscribe(item => {
    //         console.log(item)
    //         if (item) {
    //             this.cacheService.set(this.cacheService.key.loginInfo,item,this.cacheService.key.loginDateRange);
    //             this.cacheService.set(this.cacheService.key.userInfo,item,this.cacheService.key.loginDateRange);
    //             this.getInfo(item);
    //             this.router.navigate(['/manage']);
    //             this.layerService.hideLoading(loading)
    //         }
    //     })
    // }

    getInfo(user) {
        this.store.dispatch(getLoginInfo({payload: user}))
        this.router.navigate(['/manage']);
      }
}