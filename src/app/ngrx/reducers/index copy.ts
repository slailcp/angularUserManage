// import { NgModule } from '@angular/core';

// import { StoreModule,createSelector,createFeatureSelector } from '@ngrx/store';
// import * as counterReducer from 'src/app/ngrx/reducers/header.reducer';
// import * as loginReducer from 'src/app/ngrx/reducers/login.reducer';
// import * as loginInfoReducer from 'src/app/ngrx/reducers/login-info.reducer';
// import { User } from 'src/app/interfacer/user';


// export interface State {
//     countInfo:counterReducer.State,
//     userInfo:loginReducer.State
// }
  
// const initialState: State = {
//     countInfo: counterReducer.initialState,
//     userInfo: loginReducer.initialState
// };
  
// const reducers = { 
//     countInfo: counterReducer.counterReducer,
//     userInfo:loginReducer.loginReducer
//  }


// export const selectCountInfo = (state: State) => state.countInfo;

// export const selectFeatureCount = ()=> createSelector(
//     selectCountInfo,
//   (state: counterReducer.State) => state.count
// );


// export const selectFeature = createFeatureSelector<State, loginReducer.State>('userInfo');
 
// export const selectFeatureCounts = ()=> createSelector(
//   selectFeature,
//   (state: loginReducer.State) => state.user
// );


//  export const selectUser = (state: State) => state.userInfo.user;
//  export const allUsers = (state: State) => state.userInfo.users;
 
//  export const selectVisibleBooks = () => 
//  createSelector(
//     selectUser,
//     allUsers,
//     (selectedUser: User, allUsers: User[]) => {
//     if (selectedUser && allUsers) {
//         return allUsers.filter((book: User) => book.username === selectedUser.username);
//     } else {
//         return allUsers;
//     }
//     }
// );
 

//  export const getCount = () => 
//  createSelector(
//    (state, props) => state.countInfo[props.id],
//    (counter, props) => counter * props.multiply
//  );
 



// @NgModule({
//     imports: [
//         StoreModule.forRoot(reducers),
//         // StoreModule.forFeature('countInfo',counterReducer.counterReducer),
//         // StoreModule.forFeature('userInfo',loginReducer.loginReducer),
//     ]
// })
// export class AppStoreModule {}