import {createStore as reduxCreateStore, combineReducers,applyMiddleware,Reducer}from 'redux';
import { connectRouter ,routerMiddleware, RouterState } from 'connected-react-router';
import { UsersReducer } from '../users/reducers';
import { ProductsReducer } from '../products/reducers';
import { History } from "history";
import thunk from "redux-thunk";
import { UserState } from '../users/types';
import { ProductsState } from '../products/types';
import {configureStore } from '@reduxjs/toolkit'


export type AppState = {
  router: Reducer<RouterState>
  products: ProductsState
  users: UserState
}

export const createStore = (history: History)=>{
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
      products:ProductsReducer
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    ),
  )
}
// export const store = configureStore({
//   reducer: {
//     users: UsersReducer,
//     products: ProductsReducer,
// }
// })
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch