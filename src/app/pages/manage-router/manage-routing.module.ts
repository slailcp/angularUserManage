import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageRouterComponent } from './manage.component';

// import { ProductListComponent } from './product/product-list/product-list.component';
// import { HeroComponent } from './heroes/hero/hero.component';
// import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
// import { ProductDetailComponent } from './product/product-detail/product-detail.component';
// import { NameEditorComponent } from './heroes/name-editor/name-editor.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { OrderEnterComponent } from './order/order-enter/order-enter.component';
import { IndexComponent } from './index/index.component';
import { StaffDataSetComponent } from './setting/staff-data-set/staff-data-set.component';


const routes: Routes = [
  {
    path:'',
    component:ManageRouterComponent,
    canActivate: [AuthGuard],
    children:[
      { 
        path: '',
        canActivateChild: [AuthGuard], // 进入所有子路由的之前都会被激活
        children: [
          { path: '',component: IndexComponent},
          { path: 'index',component: IndexComponent},
          { path: 'order-list',component:OrderListComponent},
          { path: 'order-detail/:id',component:OrderDetailComponent},
          { path: 'order-enter',component:OrderEnterComponent},
          { path: 'staff-set',component:StaffDataSetComponent},
          // { path: 'name-editor', component: NameEditorComponent },
          // { path: 'product-list', component: ProductListComponent },
          // { path: 'product-list/:id', component: ProductDetailComponent },
          // { path: 'hero', component: HeroComponent },
          // { path: 'hero/:id', component: HeroDetailComponent },
        ]
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
