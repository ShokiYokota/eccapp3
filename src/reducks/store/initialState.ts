import { ProductsState } from "../products/types";
import { UsersStateType } from "../users/types";

type InitialState = {
  products: ProductsState
  users: UsersStateType
}

export const initialState : InitialState = {
    products: {
      list: []
    },
    users: {
    isSignedIn: false,  //サインインしているかどうか　
    role: "",
    uid: "",          //numberなら初期値０でいい？
    username: ""
  }
}
