import React from "react";
import { signInAction, signOutAction } from "./actions";
import {push} from "connected-react-router"
import { RootStateType, UsersStateType } from "./types";
import {auth,db,FirebaseTimestamp} from "../../firebase"
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from "redux";

// サインインしているかどうか監視し返す関数
export const listenAuthState = ():ThunkAction<void,RootStateType,unknown,AnyAction> => {
  return async(dispatch) =>{
    return auth.onAuthStateChanged((user:any)=>{ //引数なし、戻り値firebase.Observerかfirebase.User
      
      if(user){ //userが存在していたら
        const uid = user.uid
        db.collection('users').doc(uid).get()
        .then((snapshot:any)=>{
          //snapshotは返ってきたユーザーのdata
          const data = snapshot.data() as Omit<RootStateType["users"],'isSignedIn'>;

          //ユーザーの認証情報をセットする
          dispatch(signInAction({
            role:data.role,
            uid:data.uid,
            username:data.username
          }))
        })
      }else {
        dispatch(push('/signin'))
      }
    })
  }
}

// AppThunkに型定義
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootStateType,
//   unknown,
//   AnyAction
// >
//サインインする時に実行する関数
export const signIn = (email:string,password:string): ThunkAction<void,void,unknown,AnyAction>=>{
  return async (dispatch)=>{
    //バリテーション
    //emailとpasswordが空の場合alertを出す
    if(email === "" || password === ''){
      alert("必須項目が未入力です");
      return false;
    }

    //メアドとパスワードで認証する
    auth.signInWithEmailAndPassword(email,password)
      .then((result: { user: any; })=>{
        const user = result.user;//戻り値はPromise<firebase.auth.UserCredinal>

        if (user) {//boolean型？？？
          const uid = user.uid;
          
          //firebaseのusersからuidを検索してgetする
          db.collection('users').doc(uid).get()
          .then((snapshot:any)=>{
            //snapshotは返ってきたユーザーのdata
            const data = snapshot.data() as Omit<RootStateType["users"],'isSignedIn'>;

            //ユーザーの認証情報をセットする
            dispatch(signInAction({
              role:data.role,
              uid:data.uid,
              username:data.username
            }))

            //Homeに遷移させる
            dispatch(push('/'))
          })
        }
      })
    }
}
  

export const signUp  = (username:string, email:string, password:string, confirmPassword:string): ThunkAction<void,void,unknown,AnyAction> =>{
  return async(dispatch) =>{
    // return async(dispatch: React.Dispatch<unknown>) =>{
    //バリデーション
    //usernameとemailとpasswordとconfirmPasswordが空の場合alertを出す
    if (username === "" || email === "" || password === '' || confirmPassword === "") {
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
      .then((result:any) => {
        const user = result.user;

        //アカウント作成が成功していたら処理を続ける
        if (user) {
          const uid = user.uid;
          //現在の時間を設定する
          const timestamp = FirebaseTimestamp.now();

          //ユーザーのデータの雛形に当てはめる
          const userInitialData = {
            created_at: timestamp,
            email,
            role: "customer",
            uid,
            updated_at: timestamp,
            username
          }

          //firebaseのusersのuseIdが一致すれば保存しhomeに遷移させる
          db.collection('users').doc(uid).set(userInitialData)
            .then(() => {
              dispatch(push('/'));
            })
        }
      })
  }
}
export const signOut = () :ThunkAction<void,void,unknown,AnyAction>=> {
  return async (dispatch) => {
    auth.signOut() 
    .then(()=>{
      dispatch(signOutAction());
      dispatch(push('/signin'))
    })
  }
}

export const resetPassword = (email:string) :ThunkAction<void,void,unknown,AnyAction>=> {
  return async (dispatch) =>{
    if(email === ""){
      alert("必須項目が未入力です")
      return false
    }else{
      auth.sendPasswordEmail(email)
        .then(()=>{
          alert('入力されたアドレスにパスワードリセット用のメールを送りました')
          dispatch(push('/signin'))
        }).cathch(()=>{
          alert('パスワードリセットに失敗しました')
        })
    }
  }
}