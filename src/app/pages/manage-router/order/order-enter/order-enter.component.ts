import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { LayerService } from 'src/app/services/layer.service';
import { CodeType } from 'src/app/interfacer/user';



@Component({
  selector: 'app-order-enter',
  templateUrl: './order-enter.component.html',
  styleUrls: ['./order-enter.component.css']
})
export class OrderEnterComponent implements OnInit {
  routeId: string
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
  constructor(
    private layerService: LayerService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        console.log(params);
        this.routeId = params.get('id');
        if (this.routeId) {
          return this.userService.getUser(this.routeId);
        } else {
          return of(null);
        }
        
      })
    ).subscribe(data => {
      if (data === null) {

        return;
      }
      if (!data.length) {
        this.layerService.alert({
          message: '查询失败，没有这个人哦',
          completeCallback: () => {
            this.router.navigate(['/manage/order-list']);
          }
        })
        return;
      }
      this.user = data[0]
    })

    
 
  }

  edit() {
    this.userService.editUser(this.user).subscribe(data => {
      console.log(data);
      this.layerService.alert({
        message: '更新成功',
        completeCallback: () => {
          this.router.navigate(['/manage/order-list']);
        }
      })
      
    })
  }
  add() {
    this.userService.addUser(this.user).subscribe(data => {
      console.log(data);
      this.layerService.alert({
        message: '新增成功',
        completeCallback: () => {
          this.router.navigate(['/manage/order-list']);
        }
      })
    })
  }


  onSubmit(heroForm) {
    const controls = heroForm.form.controls;
    for (let key in controls) {
      if (!controls[key].valid) {
        console.log(key + '校验不通过')
        return;
      }
    }
    
    // return;
    if (this.routeId) {
      this.edit();
    } else {
      this.add();
    }
  }

}
