import React from "react";
import { signInAction } from "./actions";
import {push} from "connected-react-router"
import { RootStateType } from "./types";

export const signIn = () => {
  return async (dispatch : React.Dispatch<unknown>,getState:()=> RootStateType)=>{
    const {users} = getState();
    const isSignedIn = users.isSignedIn;
    if(isSignedIn) return;

    const url = "https://github.com/ShokiYokota";
    const response: {
      login: string
    } = await fetch(url).then(res=>res.json()).catch(()=> null);
  const username = response.login;

  dispatch(signInAction({
    userId: "12345",
    userName: username
  }));

    dispatch(push('/'));
 } 
}
