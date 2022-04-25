import { ProductsState } from "../products/types";
import { UserState } from "../users/types";

type InitialState = {
  products: ProductsState
  users: UserState
}

export const initialState : InitialState = {
    products: {
      list: []
    },
    users: {
    cart:[],
    isSignedIn: false,  //サインインしているかどうか　
    role: "",
    uid: "",          //numberなら初期値０でいい？
    username: "",
    orders: []
  }
}
