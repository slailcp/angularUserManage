import { NgModule }             from '@angular/core';
import { RouterModule, Routes,PreloadAllModules } from '@angular/router';


import { LoginComponent } from './pages/login/login/login.component';
import { RegisterComponent } from './pages/login/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';


const appRoutes: Routes = [
  { path: 'login', component: LoginComponent,canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  {
    path: 'manage',
    loadChildren: () => import('./pages/manage-router/manage.module').then(mod => mod.ManageModule)
  },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,{ preloadingStrategy: PreloadAllModules})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }