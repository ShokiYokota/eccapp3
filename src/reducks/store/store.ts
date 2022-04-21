import {createStore as reduxCreateStore, combineReducers,applyMiddleware,Reducer}from 'redux';
import { connectRouter ,routerMiddleware, RouterState } from 'connected-react-router';
import { UsersReducer } from '../users/reducers';
import { ProductsReducer } from '../products/reducers';
import { History } from "history";
import thunk from "redux-thunk";
import { UsersStateType } from '../users/types';
import { ProductsState } from '../products/types';

export type AppState = {
  router: Reducer<RouterState>
  products: ProductsState
  users: UsersStateType
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