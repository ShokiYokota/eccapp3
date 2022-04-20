import { sign } from "crypto";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../reducks/users/operations";
import { getUserId,getUsername} from "../reducks/users/selectors";
import { RootStateType, UsersStateType } from "../reducks/users/types";

export const Home = () =>{
  const dispatch = useDispatch();
  const selector = useSelector<RootStateType, UsersStateType>(state => state.users);//<RootStateType, RootStateType>(state => state);
  const uid = getUserId({users: selector});
  const username = getUsername({users: selector});

  return (
    <div>
     Homeです
     <p>ユーザID:{uid}</p>
     <p>ユーザー名:{username}</p>
     <button type="button" onClick={() => dispatch(signOut())}>サインアウト</button>
    </div>
  )
}