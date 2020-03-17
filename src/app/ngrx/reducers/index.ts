import { NgModule } from '@angular/core';
import { StoreModule, createSelector, createFeatureSelector, on } from '@ngrx/store';
import * as loginInfoReducer from 'src/app/ngrx/reducers/login-info.reducer';
import * as countReducer from 'src/app/ngrx/reducers/count.reducer';

export interface State {
    loginInfo: loginInfoReducer.State,
    countInfo:countReducer.State,
}

export const initialState =  {
    loginInfo: loginInfoReducer.initialState,
    countInfo: countReducer.initialState,
}

const reducers = { 
    loginInfo: loginInfoReducer.reducer,
    countInfo: countReducer.counterReducer,
}

// 获取登录信息中的用户姓名
export const selectUsername = () => createSelector(
    createFeatureSelector<State, loginInfoReducer.State>('loginInfo'),
    (state: loginInfoReducer.State) => state.username
);

// 在State状态中筛选出countInfo
// const selectCountInfo = (state: State) => state.countInfo;
// 筛选出count    调用 store.pipe(select((()=>fromReducer.selectFeatureCount)()))
export const selectFeatureCount = createSelector(
  (state: State) => state.countInfo, // 等价于上面的 selectCountInfo
  (state: State) => state.loginInfo.username,
  (state: countReducer.State,userName: string) => `${userName}:${state.count}`, // state为上一级流下来的countInfo,userName为上一级流下来的state.loginInfo.username
);

export const getCount = () => 
createSelector(
   (state, props) => state.countInfo[props.id],
   (counter, props) => counter * props.multiply // 此处的counter为上一级流下来的count
)

export const selectFeature = createFeatureSelector<State, countReducer.State>('countInfo');
export const selectFeatureCounts = ()=> createSelector(
  selectFeature,
  (state: countReducer.State) => state.count
);

@NgModule({
    imports: [
        StoreModule.forRoot(reducers)
        // StoreModule.forFeature('loginInfo',loginInfoReducer.reducer), // 在app.module.ts里面imports:[StoreModule.forRoot({})] 
    ]
})
export class AppStoreModule {}