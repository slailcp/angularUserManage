import { NgModule } from '@angular/core';

import { StoreModule, createSelector, createFeatureSelector, on } from '@ngrx/store';
import * as loginInfoReducer from 'src/app/ngrx/reducers/login-info.reducer';


export interface State {
    loginInfo: loginInfoReducer.State,
}

export const initialState =  {
    loginInfo: loginInfoReducer.initialState,
}


const reducers = { 
    loginInfo: loginInfoReducer.reducer,
}

// 获取登录信息中的用户姓名
export const selectUsername = () => createSelector(
    createFeatureSelector<State, loginInfoReducer.State>('loginInfo'),
    (state: loginInfoReducer.State) => state.username
);


@NgModule({
    imports: [
        StoreModule.forRoot(reducers)
        // StoreModule.forFeature('loginInfo',loginInfoReducer.reducer), // 在app.module.ts里面imports:[StoreModule.forRoot({})] 
    ]
})
export class AppStoreModule {}