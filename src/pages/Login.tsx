import React from "react";
import {useDispatch,useSelector} from "react-redux";
import {signIn} from '../reducks/users/operations'

export const Login = () => {
  const dispatch = useDispatch();
 
  return (
    <>
    <h2>ログイン</h2>
    <button type="button" onClick={() => dispatch(signIn())}>
      ログインする
    </button>
    </>
  )
}