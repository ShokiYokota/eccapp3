import {createStore as reduxCreateStore, combineReducers,applyMiddleware}from 'redux';
import { connectRouter ,routerMiddleware } from 'connected-react-router';
import { UsersReducer } from '../users/reducers';
import { ProductsReducer } from '../products/reducers';
import { History } from "history";
import thunk from "redux-thunk";

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