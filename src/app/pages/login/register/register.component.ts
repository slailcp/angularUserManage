import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { LayerService } from 'src/app/services/layer.service';
import { CodeType } from 'src/app/interfacer/user';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
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
      private router: Router) { }
  
    ngOnInit() {}
  
    add() {
      this.userService.addUser(this.user).subscribe(data => {
        console.log(data);
        this.layerService.alert({
          message: '注册成功,请重新登录',
          completeCallback: () => {
            this.router.navigate(['/login']);
          }
        })
      })
    }
  
  
    onSubmit(heroForm) {
      const controls = heroForm.form.controls;
      for (let key in controls) {
        if (!controls[key].valid) {
          console.log(key + '校验不通过')
          this.layerService.showToast(key + '校验不通过')
          return;
        }
      }
      this.add();

    }
}