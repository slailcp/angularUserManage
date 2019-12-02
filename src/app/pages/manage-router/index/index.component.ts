import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { LayerService } from 'src/app/services/layer.service';
import { User } from 'src/app/interfacer/user';
import { UserService } from 'src/app/services/user.service';
import {debounceTime, distinctUntilChanged, switchMap, retry} from 'rxjs/operators'
import {Subject, Observable} from 'rxjs'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  userInfo: any;
  autoCompleteModel: string = '';
  autoCompleteSub = new Subject();
  filteredUserName$: Observable<any[]>;

  filteredStates:any[] = [];
  _filteredStates:any[] = [
    {value: '橙子', key: 1},
    {value: '葡萄', key: 2},
    {value: '芒果', key: 3},
    {value: '榴莲', key: 4},
    {value: '荔枝', key: 5},
    {value: '提子', key: 6},
    {value: '橘子', key: 7},
    {value: '苹果', key: 8},
    {value: '西瓜', key: 9},
    {value: '火龙果', key: 10},
    {value: '牛油果', key: 11},
    {value: '木瓜', key: 12},
    {value: '樱桃', key: 13},
    {value: '甘蔗', key: 14},
    {value: '枣子', key: 15},
    {value: '香蕉', key: 16},
    {value: '黑莓', key: 17},
    {value: '草莓', key: 18}
  ];
  constructor(private loginService: LoginService,
    private layerService: LayerService,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.filteredStates = [...this._filteredStates]

    this.filteredUserName$ = this.autoCompleteSub.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value: string) => this.userService.getUsers({username: value.trim()}).pipe(retry(3)))
    )
  }

  onToast() {
    this.layerService.showToast('我是一个tip');
  }

  onLoading() {
   const loading = this.layerService.showLoading();
   setTimeout(() => {
    this.layerService.showToast('关闭loading!');
   },1500)
   setTimeout(() => {
    this.layerService.hideLoading(loading);
   },2000)
  }

  onAlert() {
    // this.layerService.alert('我是一个alert');  // 简单的弹出一行文字

    this.layerService.alert({
      title: '欢乐的给个提示', // title
      message: '我是一个alert哦,快来戳我一下啊', // 弹出框的内容
      width: 500,
      btnMessage: '哈哈，快戳我一下！', // 自定义确定按钮
      enterCallback: () => {
        this.layerService.alert('您戳了我一下，没有关闭alert层');
        return false;
      }, // 确定
      closeCallback: () => {
        this.layerService.alert('您戳了叉叉一下，关闭了alert层');
      }, // 关闭
      completeCallback: () => {
        console.log('不管怎么说，我就是被点击了')
      } // 不管是点击了点击确定或者取消，都会执行此方法
    })
  }

  onConfirm() {
    this.layerService.confirm({
      title: '警告', // title
      message: '我是一个confirm,快来戳我一下啊', // 弹出框的内容
      btnCancelMessage: '戳一下！', // 自定义取消按钮
      btnEnterMessage: '想得美!', // 自定义确定按钮
      width: 500,
      enterCallback: () => {
        this.layerService.alert('您点击了’想得美‘，confirm弹出层还没有关闭哦！');
        return false; //  return false 阻止confirm弹出层关闭
      }, // 确定
      closeCallback: () => {
        this.layerService.alert('您点击了’戳一下‘，并且关闭了confirm弹出层！');
      }, // 关闭
      completeCallback: () => {
        console.log('confirm被我点击了')
      } // 不管是点击了点击确定或者取消，都会执行此方法
    })

    // 也可以使用promise的方式调用
    // this.layerService.confirm('我是一个confirm').then((v) => {
    //   if (v) {
    //     this.layerService.alert('您点击了确定哦');
    //   } else {
    //     this.layerService.alert('您点击了取消哦');
    //   }
    // })
  }

  searchName(value) {
    this.filteredStates = this._filteredStates.filter(item => item.value.indexOf(value.trim())!==-1);
  } 

  searchNameajax(value) {
    this.autoCompleteSub.next(value)
  }
  //
  onAutoComplete(ev) {
     this.autoCompleteModel = ev.target.innerHTML.trim();
     console.log(ev.target.attributes['key'].value)
  }

}
