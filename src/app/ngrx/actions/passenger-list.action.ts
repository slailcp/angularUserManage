import { createAction,props } from '@ngrx/store';
import { State } from 'src/app/ngrx/reducers/login-info.reducer';

  // 所有乘机人
 export const allPagessengerList = createAction(
    '[passenger Page] allPagessenger',
     props<{payload:State[]}>()
  );
   // 已选乘机人列表
  export const selectPagessengerList = createAction(
    '[passenger Page] selectPagessenger',
     props<{payload:State[]}>()
  );
   // 编辑乘客
  export const editPagessenger = createAction(
    '[passenger Page] selectPagessenger',
     props<{payload:State}>()
  );
  
    