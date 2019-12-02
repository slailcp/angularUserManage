import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  user$:Observable<any[]>
  constructor(
    private userService:UserService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.user$ = this.route.paramMap.pipe(
      switchMap(params => {
        console.log(params);
        const id = params.get('id');
        return this.userService.getUser(id);
      })
    )
    
  }

}
