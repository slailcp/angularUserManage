import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/untils/cache.service';
import { Store } from '@ngrx/store';
import { getLoginInfo } from 'src/app/ngrx/actions/login-info.action';
import { UserService } from 'src/app/services/user.service';
import * as rootReducer from 'src/app/ngrx/reducers/index';
import { LayerService } from 'src/app/services/layer.service';
import { Router } from '@angular/router';
import { CodeType } from 'src/app/interfacer/user';

@Component({
  selector: 'app-staff-data-set',
  templateUrl: './staff-data-set.component.html',
  styleUrls: ['./staff-data-set.component.css']
})
export class StaffDataSetComponent implements OnInit {
  userInfo: any;
  user: any = {
    username: '',
    MobilePhone: '',
    sex: '0',
    age: '0',
    identity: '',
    like: '',
    codetype: '',
    codenumber: ''
  }
  codetype:CodeType[] = [
    {codeContent: '身份证', codeKey: 1},
    {codeContent: '护照', codeKey: 2},
    {codeContent: '港澳通行证', codeKey: 3},
    {codeContent: '回乡证', codeKey: 4},
    {codeContent: '军官证', codeKey: 5},
  ]
  constructor(private cacheService: CacheService,
    private userService: UserService,
    private layerService: LayerService,
    private router:Router,
    private store: Store<rootReducer.State>) { 
      
    }

  ngOnInit() {
    this.userInfo = this.cacheService.get(this.cacheService.key.userInfo);
    this.userService.getUser(this.userInfo.id).subscribe(data => {
      if (data.length) {
        this.user = data[0];
      }
    })
  }

  onSubmit(heroForm) {
    const controls = heroForm.form.controls;
    for (let key in controls) {
      if (!controls[key].valid) {
        console.log(key+'校验不通过')
        return;
      }
    }
    

    this.userService.editUser(this.user).subscribe(data => {
      this.store.dispatch(getLoginInfo({
        payload: {
          ...this.user
        }
      }));
      this.cacheService.set(this.cacheService.key.userInfo, this.user, this.cacheService.key.loginDateRange)

      this.layerService.alert({
        message: '更新成功',
        completeCallback: () => {
          this.router.navigate(['/manage/order-list']);
        }
      })
      
    })
  }
}
