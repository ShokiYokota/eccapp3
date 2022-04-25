import { AddedProduct,
  //FetchOrdersHistoryAction,
  FetchProductsInCartActoin,
  //FETCH_ORDERS_HISTORY,
  FETCH_PRODUCTS_IN_CART,
  SignInAction,
  SignOutAction,
  SIGN_IN,
  SIGN_OUT,
  UserState,} from "./types";

  export const fetchProductsInCartActoin = (products: AddedProduct[]):FetchProductsInCartActoin => { //AddedProduct[]は商品に関するデータ構造（（例）名前やid）を持っている
    return { 
      type: FETCH_PRODUCTS_IN_CART,
      payload: products
    }
  }


export const signInAction = (userState: UserState):SignInAction => { //userState=Object型でkeyにuserIdとuserNameを持っている
  return { 
    type: SIGN_IN,
    payload: {   //payload=データの塊
      isSignedIn: true,
      // orders: userState.orders,
      role: userState.role,
      uid: userState.uid,
      username: userState.username,
      cart: userState.cart,
    }
  }
}

// TypeScriptなしの書き方⇨ export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = (): SignOutAction => {
  return {
    type: SIGN_OUT,
    payload: {
      isSignedIn: false,
      // orders: [],
      role: '',
      uid: '',
      username: '',
      cart: [],
    },
  }
}
