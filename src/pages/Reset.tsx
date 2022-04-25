import {useCallback,useState,ChangeEvent} from 'react';
import { useDispatch } from 'react-redux';
import { TextInput , PrimaryButton} from "../components/UIkit";
import {resetPassword} from "../reducks/users/operations"
import {push} from "connected-react-router";

export const Reset = () =>{
  const dispatch = useDispatch()

  //emailのstate
  const [email, setEmail] = useState("");
  
  //emailのinputがchangeしたら走るイベント
  const inputEmail = useCallback((event:ChangeEvent<HTMLInputElement>)=>{
    setEmail(event.target.value);
  },[setEmail]);

  


  return(
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">パスワードリセット</h2>
      <div className="module-spacer--medium" aria-hidden="true"/>
      <TextInput
        label="メールアドレス"
        value={email}
        type="email"
        onChange={inputEmail}
      />
      <div className="module-spacer--medium" aria-hidden="true"/>
      <div className="center">
        <PrimaryButton label="パスワードリセット" onClick={() => dispatch(resetPassword(email))}/>
        <p onClick={()=>dispatch(push('/signin'))}>サインイン画面に戻る</p>
      </div>
    </div>
  )
}