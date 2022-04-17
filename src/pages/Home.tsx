import React from "react";
import { useSelector } from "react-redux";
import { getUserId,getUserName} from "../reducks/users/selectors";

export const Home : React.FC = () =>{
  const selector = useSelector(state => state);//<RootStateType, RootStateType>(state => state);
  const userId = getUserId(selector);
  const userName = getUserName(selector);

  return (
    <>
     Homeです
     <p>ユーザID:{userId}</p>
     <p>ユーザー名:{userName}</p>
    </>
  )
}