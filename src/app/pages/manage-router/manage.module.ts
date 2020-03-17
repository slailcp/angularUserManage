import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import { StoreModule } from '@ngrx/store';

import {HeaderTopComponent} from '../../components/header-top/header-top.component';
import {MenuComponent} from '../../components/menu/menu.component';

import {ManageRoutingModule} from './manage-routing.module';
import {ManageRouterComponent} from './manage.component';
// import { HeroDetailComponent } from './heroes/hero-detail/hero-detail.component';
// import { ProductListComponent } from './product/product-list/product-list.component';
// import { HeroComponent } from './heroes/hero/hero.component';
// import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import {HeaderTempComponent} from 'src/app/components/header-temp/header-temp.component';
// import { PopupComponent } from 'src/app/components/popup/popup.component';
import {HighlightDirective} from 'src/app/directives/highlight.directive';
// import { FlyingProductsPipe } from 'src/app/pipes/flying-products.pipe';
import {FormsModule} from '@angular/forms';
// import { NameEditorComponent } from './heroes/name-editor/name-editor.component';
import {ForbiddenValidatorDirective} from 'src/app/validators/forbidden-name.directive';
import {OrderListComponent} from './order/order-list/order-list.component';
import {OrderEnterComponent} from './order/order-enter/order-enter.component';
import {OrderDetailComponent} from './order/order-detail/order-detail.component';
import {IndexComponent} from './index/index.component';
import {StaffDataSetComponent} from './setting/staff-data-set/staff-data-set.component';
import {FjAutocompleteDirective} from 'src/app/directives/fj-autocomplete.directive';
import {AutocompleteComponent} from 'src/app/components/fj-layers/autocomplete.component';
import {SexPipe} from 'src/app/pipes/sex.pipe';
import {DialogComponent} from "../../components/dialog/dialog.component";
import { NgrxComponent } from './methods/ngrx/ngrx.component';


@NgModule({
  declarations: [
    HeaderTopComponent,
    HeaderTempComponent,
    MenuComponent,
    DialogComponent,
    ManageRouterComponent,
    // // ProductListComponent,
    // HeroComponent,
    // HeroDetailComponent,
    // ProductDetailComponent,
    HighlightDirective,
    FjAutocompleteDirective,
    ForbiddenValidatorDirective,
    // ExponentialStrengthPipe,
    SexPipe,
    // FlyingProductsPipe,
    // DateTransformPipe,
    // NameEditorComponent,
    OrderListComponent,
    OrderEnterComponent,
    OrderDetailComponent,
    IndexComponent,
    StaffDataSetComponent,
    AutocompleteComponent,
    NgrxComponent
  ],
  imports: [
    CommonModule,
    ManageRoutingModule,
    FormsModule
  ],
  exports: [HighlightDirective, FjAutocompleteDirective, SexPipe]
})
export class ManageModule {
}
