import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';

import { LoginComponent } from './pages/login/login/login.component';
import { RegisterComponent } from './pages/login/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

// import { ManageModule } from './pages/manage-router/manage.module';
// import { PopupComponent } from './components/popup/popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './components/dialog/dialog.component';
import { LoadingComponent } from './components/fj-layers/loading.component';
import { ToastComponent } from './components/fj-layers/toast.component';
import { AppStoreModule } from './ngrx/reducers';
import { httpInterceptorProviders } from './http-interceptors';
import { AlertComponent } from './components/fj-layers/alert.component';
import { ConfirmComponent } from './components/fj-layers/confirm.component';
import { AutocompleteComponent } from './components/fj-layers/autocomplete.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    // PopupComponent,
    DialogComponent,
    LoadingComponent,
    ToastComponent,
    AlertComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppStoreModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    // httpInterceptorProviders
    // StoreModule.forRoot({}),
    // StoreModule.forFeature('count', counterReducer)
    // ManageModule,
    AppRoutingModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents: [
    // PopupComponent,
    LoadingComponent,
    ToastComponent,
    AlertComponent,
    ConfirmComponent
  ],
  exports: []
})
export class AppModule { }
