import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from '../actions/count.action';
 
export interface State {
    count:number
};
export const initialState: State = {count:0};
 
const _counterReducer = createReducer(initialState,
  on(increment, state => ({...state,count:state.count-1})), // 计数器+1
  on(decrement, state => ({...state,count:state.count+1})), // 计数器-1
  on(reset, (state,action) => ({...state,count:action.count})), // 计数器重置
);
 
export function counterReducer(state, action) {
  return _counterReducer(state, action);
}