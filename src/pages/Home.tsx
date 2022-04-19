import React from "react";
import { useSelector } from "react-redux";
import { getUserId,getUsername} from "../reducks/users/selectors";

export const Home = () =>{
  const selector = useSelector(state => state);//<RootStateType, RootStateType>(state => state);
  const uid = getUserId(selector);
  const username = getUsername(selector);

  return (
    <>
     Homeです
     <p>ユーザID:{uid}</p>
     <p>ユーザー名:{username}</p>
    </>
  )
}