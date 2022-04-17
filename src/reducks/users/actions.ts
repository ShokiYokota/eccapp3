import { UserActionType, UsersStateType, UsersType } from "./types";

//Userのアクションタイプの定数
export const ACTION_TYPE = {
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT"
}as const;


export const signInAction = (userState:Omit<UsersType['state'],'isSignedIn'>): UsersType['action'] => { //userState=Object型でkeyにuserIdとuserNameを持っている
  return { 
    type: ACTION_TYPE.SIGN_IN,
    payload: {   //payload=データの塊
      isSignedIn: true,
      userId: userState.userId,
      userName: userState.userName
    }
  }
}

// TypeScriptなしの書き方⇨ export const SIGN_OUT = "SIGN_OUT";
export const signOutAction = () :UsersType['action'] => {
  return {
    type: ACTION_TYPE.SIGN_OUT,
    payload: {
      isSignedIn: false, //初期値に戻す
      userId: "",
      userName: ""
    }
  }
}