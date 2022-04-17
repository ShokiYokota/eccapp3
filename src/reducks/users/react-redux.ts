import 'react-redux'
import {RootStateType} from "./types";

// ______________________________________________________
//

// react-reduxのDefaultRootStateをRootStateTypeでオーバーライドする
declare module 'react-redux' {
  interface DefaultRootState extends RootStateType {
  }
}