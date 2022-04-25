import React, {useCallback,useState,ChangeEvent} from 'react';
import { useDispatch } from 'react-redux';
import { TextInput , PrimaryButton} from "../components/UIkit";
import {signIn} from "../reducks/users/operations"
import {push} from "connected-react-router"

export const SignIn = () =>{
  const dispatch = useDispatch()

  //emailのstate
  const [email, setEmail] = useState("");
  //passwordのstate
  const [password, setPassword] = useState("");
  
  //emailのinputがchangeしたら走るイベント
  const inputEmail = useCallback((event:ChangeEvent<HTMLInputElement>)=>{
    setEmail(event.target.value);
  },[setEmail]);

  //passwordのinputがchangeしたら走るイベント
  const inputPassword = useCallback((event:ChangeEvent<HTMLInputElement>)=>{
    setPassword(event.target.value);
  },[setPassword]);

  return(
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium" aria-hidden="true"/>
      <TextInput
        label="メールアドレス"
        value={email}
        type="email"
        onChange={inputEmail}
      />
      <TextInput
        label="パスワード"
        value={password}
        type="password"
        onChange={inputPassword}
      />
      <div className="module-spacer--medium" aria-hidden="true"/>
      <div className="center">
        <PrimaryButton label="サインイン" onClick={() => dispatch(signIn(email, password))}/>
        <p onClick={()=>dispatch(push('/signup'))}>アカウントをお持ちでない方はこちら</p>
        <p onClick={()=>dispatch(push('/signin/reset'))}>パスワードを忘れた方はこちら</p>
      </div>
    </div>
  )
}