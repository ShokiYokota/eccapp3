import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../reducks/store/store";
import { signOut } from "../reducks/users/operations";
import { getUserId,getUsername} from "../reducks/users/selectors";

export const Home = () =>{
  const dispatch = useDispatch();
  const selector = useSelector((state:AppState)=>state)
  const username = getUsername(selector)
  const uid = getUserId(selector)

  return (
    <div>
     Homeです
     <p>ユーザID:{uid}</p>
     <p>ユーザー名:{username}</p>
     <button type="button" onClick={() => dispatch(signOut())}>サインアウト</button>
    </div>
  )
}