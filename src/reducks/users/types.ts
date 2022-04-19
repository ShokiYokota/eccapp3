import {ACTION_TYPE} from "./actions";

// storeのstateの型
export type RootStateType = {
  users:UsersType['state'];
}

// UsersTypeの型
export type UsersType = {
  state: UsersStateType;
  action: UserActionType;
}

export type UsersStateType = {
  isSignedIn: boolean;
  role: string;
  uid: string;
  username: string;
}

export type UserActionType = {
  type: keyof typeof ACTION_TYPE;
  payload: UsersStateType;
}