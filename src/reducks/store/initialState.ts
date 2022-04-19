import { RootStateType } from "../users/types";

export const initialState : RootStateType = {
    users: {
    isSignedIn: false,  //サインインしているかどうか　
    role: "",
    uid: "",          //numberなら初期値０でいい？
    username: ""
  }
}
