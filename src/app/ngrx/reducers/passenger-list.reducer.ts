import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { getLoginInfo } from '../actions/login-info.action';

export interface State {
    userid: number,
    username: string,
    password: string,
    like: string,
    age: number,
    sex: string,
    department: string,
    MobilePhone: string,
    codetype: string,
    codenumber: string,
    AccountData: string,
    self: boolean
};

// 初始值
export const initialState: State[] | [] = [];

const _passengerListReducer = createReducer(initialState,
    on(getLoginInfo, (state, action) => {
        console.log(action);
        return ({
            ...state,
            ...action.payload
        })
    }),
);


export function reducer(state, action) {
    return _passengerListReducer(state, action);
}