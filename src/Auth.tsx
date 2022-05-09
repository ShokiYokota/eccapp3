import {useEffect,ReactNode} from "react";
import { useSelector,useDispatch } from "react-redux";
import { listenAuthState } from "./reducks/users/operations";
import {getIsSignedIn} from "./reducks/users/selectors"
import { AppState } from "./reducks/store/store";

type AuthPropsType = {
  children: ReactNode
}

export const Auth = ({ children }: AuthPropsType): JSX.Element => {
  const dispatch = useDispatch()
  const selector = useSelector((state:AppState) => state)
  const isSignedIn = getIsSignedIn(selector)

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState())
    }
  }, [])

  if(!isSignedIn){
    return <></>
  }else{
    return <>{children}</> //受け取った値をそのままreturnできる
  }
  
}