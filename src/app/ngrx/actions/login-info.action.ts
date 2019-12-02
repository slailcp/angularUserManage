import { createAction,props } from '@ngrx/store';
import { State } from 'src/app/ngrx/reducers/login-info.reducer';

export const getLoginInfo = createAction(
  '[getLoginInfo Page] getLoginInfo',
   props<{payload:any}>()
);




