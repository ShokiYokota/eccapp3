import { Eco } from "@material-ui/icons";
import { ChangeEvent, useCallback, useState} from "react";
import { TextInput , PrimaryButton} from "../components/UIkit";

export const SignUp = () =>{
  //usernameのstate
  const [username, setUsername] = useState("");
  //emailのstate
  const [email, setEmail] = useState("");
  //passwordのstate
  const [password, setPassword] = useState("");
  //confirmPasswordのstate
  const [confirmPassword, setConfirmPassword] = useState("")

  const inputUsername = useCallback((event:ChangeEvent<HTMLInputElement>)=>{
    setUsername(event.target.value);
  },[setUsername]);

  const inputEmail = useCallback((event:ChangeEvent<HTMLInputElement>)=>{
    setEmail(event.target.value);
  },[setEmail]);

  const inputPassword = useCallback((event:ChangeEvent<HTMLInputElement>)=>{
    setPassword(event.target.value);
  },[setPassword]);

  const inputConfirmPassword = useCallback((event:ChangeEvent<HTMLInputElement>)=>{
    setConfirmPassword(event.target.value);
  },[setConfirmPassword]);

  return(
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">アカウント登録</h2>
      <div className="module-spacer--medium" aria-hidden="true"/>
      <TextInput
        label="ユーザー名"
        value={username}
        onChange={inputUsername}
      />
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
      <TextInput
        label="パスワード確認用"
        value={confirmPassword}
        type="password"
        onChange={inputConfirmPassword}
      />
      <div className="module-spacer--medium" aria-hidden="true"/>
      <div className="center">
        <PrimaryButton label="アカウントを登録する" onClick={() => dispatch(signUp(username, email, password, confirmPassword))}/>
      </div>
    </div>
  )
}