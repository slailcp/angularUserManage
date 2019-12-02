import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { getLoginInfo } from '../actions/login-info.action';
import { CacheService } from 'src/app/utils/cache.service';

const cacheService = new CacheService();
export interface State {
    userid: number,
    username: string,
    like: string,
    age: number,
    sex: string,
    description: string
}

CacheService
// 初始值 
// ngrx结合localstorage：
// 将localStorage里面的用户信息赋值给initialState
// 订阅store.pipe(select('loginInfo'))实时获取数据
// 一旦this.store.dispatch(getLoginInfo({...}))；更改了数据，就可以订阅到，防止刷新后数据丢失，数据更改后要记得更新localstorage里面的信息
const userInfo = cacheService.get(cacheService.key.userInfo);
export const initialState: any = userInfo;

const _loginInfoReducer = createReducer(initialState,
    on(getLoginInfo, (state, action) => {
        console.log(action);
        return ({
            ...state,
            ...action.payload
        })
    })
);

export function reducer(state, action) {
    return _loginInfoReducer(state, action);
}