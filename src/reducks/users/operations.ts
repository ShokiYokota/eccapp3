import React from "react";
import { signInAction } from "./actions";
import {push} from "connected-react-router"
import { RootStateType } from "./types";
import {auth,db,FirebaseTimestamp} from "../../firebase"

export const signIn = (email:string,password:string)=>{
  return async (dispatch:React.Dispatch<unknown>)=>{
    //バリテーション
    //emailとpasswordが空の場合alertを出す
    if(email === "" || password === ''){
      alert("必須項目が未入力です");
      return false;
    }

    //メアドとパスワードで認証する
    auth.signInWithEmailAndPassword(email,password)
      .then(result =>{
        const user = result.user;

        if (user) {
          const userId = user.userId;

          //firebaseのusersからuserIdを検索してgetする
          db.collection('users').doc(userId).get()
          .then((snapshot)=>{
            //snapshotは返ってきたユーザーのdata
            const data = snapshot.data() as Omit<RootStateType["users"],'isSignedIn'>;

            //ユーザーの認証情報をセットする
            dispatch(signInAction({
              role:data.role,
              userId:data.userId,
              userName:data.userName
            }))

            //Homeに遷移させる
            dispatch(push('/'))
          })
        }
      })
  }
}
  

export const signUp  = (userName, email, password, confirmPassword) =>{
  return async() =>{
    //バリデーション
    //usernameとemailとpasswordとconfirmPasswordが空の場合alertを出す
    if (userName === "" || email === "" || password === '' || confirmPassword === "") {
      alert("必須項目が未入力です");
      return false;
    }
    //passwordとconfirmPasswordが一致しない場合alertを出す
    if (password !== confirmPassword) {
      alert("パスワードが一致しません。");
      return false;
    }

    //emailとpasswordでユーザーを作成する
    return auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user;

        //アカウント作成が成功していたら処理を続ける
        if (user) {
          const userId = user.userId;
          //現在の時間を設定する
          const timestamp = FirebaseTimestamp.now();

          //ユーザーのデータの雛形に当てはめる
          const userInitialData = {
            created_at: timestamp,
            email,
            role: "customer",
            userId,
            updated_at: timestamp,
            userName
          }

          //firebaseのusersのuidが一致すれば保存しhomeに遷移させる
          db.collection('users').doc(userId).set(userInitialData)
            .then(() => {
              dispatch(push('/'));
            })
        }
      })
  }
}

