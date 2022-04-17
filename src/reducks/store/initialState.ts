import { RootStateType } from "../users/types";

export const initialState : RootStateType = {
    users: {
    isSignedIn: false,  //サインインしているかどうか　
    userId: "",          //numberなら初期値０でいい？
    userName: ""
  }
}
