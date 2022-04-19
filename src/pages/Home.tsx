import React from "react";
import { useSelector } from "react-redux";
import { getUserId,getUsername} from "../reducks/users/selectors";
import { RootStateType, UsersStateType } from "../reducks/users/types";

export const Home = () =>{
  const selector = useSelector<RootStateType, UsersStateType>(state => state.users);//<RootStateType, RootStateType>(state => state);
  const uid = getUserId({users: selector});
  const username = getUsername({users: selector});

  return (
    <>
     Homeです
     <p>ユーザID:{uid}</p>
     <p>ユーザー名:{username}</p>
    </>
  )
}