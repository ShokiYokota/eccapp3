import {createSelector} from "reselect";
import { AppState} from "../../reducks/store/store";

const usersSelector = (state:AppState) => state.users;

export const getOrdersHistory = createSelector(
  [usersSelector],
  state => state.orders
)

export const getProductsInCart = createSelector(
  [usersSelector],
  state => state.cart
)

export const getIsSignedIn = createSelector(
  [usersSelector],
  state => state.isSignedIn
)

export const getUserId = createSelector(
  [usersSelector],
  state => state.uid
)

export const getUsername = createSelector(

  [usersSelector],
  state => state.username
)