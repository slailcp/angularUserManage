import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import { LayerService } from 'src/app/services/layer.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  userList$: Observable<any[]>
  constructor(private userService: UserService,
    private layerService: LayerService,
    private router: Router) { }

  ngOnInit() {
    this.userList$ = this.userService.getUsers()
  }

  skipDetail(user) {
    this.router.navigate(['/manage/order-enter', { id: user.id }]);
  }

  delUser(username: string,id: string) {
    this.layerService.confirm('确认删除'+username+'?').then((v) => {
      if (v) {
        this.userService.delUser(id).subscribe(item => {
          this.layerService.showToast('删除成功');
          this.userList$ = this.userService.getUsers()
          console.log(item)
        })
      }
    })
  }

}
