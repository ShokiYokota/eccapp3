import { RootStateType } from "../users/types";

export const initialState : RootStateType = {
    users: {
    isSignedIn: false,  //サインインしているかどうか　
    role: "",
    userId: "",          //numberなら初期値０でいい？
    userName: ""
  }
}
