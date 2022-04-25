import React from "react";
import { signInAction, signOutAction } from "./actions";
import {push} from "connected-react-router"
import {auth,db,FirebaseTimestamp} from "../../firebase"
import { ThunkAction } from 'redux-thunk'
import { AnyAction } from "redux";
import { AppState } from "../store/store";
import { AddedProduct, UserState } from './types';
// import { OrderHistoty } from "../products/types";



export const addProductToCart = (addedProduct: AddedProduct) :ThunkAction<void,AppState,unknown,AnyAction>=> {
  return async (dispatch,getState) => {
    const uid = getState().users.uid;
    const cartRef = db.collection('users').doc(uid).collection('cart').doc();
    addedProduct['cartId'] = cartRef.id
    await cartRef.set(addedProduct)
    dispatch(push('/'))
  }
}

// サインインしているかどうか監視し返す関数
export const listenAuthState = ():ThunkAction<void,void,unknown,AnyAction> => {
  return async(dispatch) =>{
    return auth.onAuthStateChanged((user:any)=>{ //引数なし、戻り値firebase.Observerかfirebase.User
      
      if(user){ //userが存在していたら
        const uid = user.uid
        db.collection('users').doc(uid).get()
        .then((snapshot:any)=>{
          //snapshotは返ってきたユーザーのdata
          const data = snapshot.data() as UserState
            if (!data) return
            dispatch(
              signInAction({
                isSignedIn: true,
                // orders: data.orders ? data.orders : [],
                role: data.role,
                uid: uid,
                username: data.username,
                cart: data.cart ? data.cart : [],
              })
            )
          })
      } else {
        dispatch(push('/signin'))
      }
    })
  }
}


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
            const data = snapshot.data();

            //ユーザーの認証情報をセットする
            dispatch(signInAction({
              isSignedIn: true,
            // orders: data.orders ? data.orders : [],
            role: data.role,
            uid: data.uid,
            username: data.username,
            cart: data.cart ? data.cart : [],
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
      auth.sendPasswordResetEmail(email)
        .then(()=>{
          alert('入力されたアドレスにパスワードリセット用のメールを送りました')
          dispatch(push('/signin'))
        }).catch(()=>{
          alert('パスワードリセットに失敗しました')
        })
    }
  }
}