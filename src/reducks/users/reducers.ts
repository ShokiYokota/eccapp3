import { initialState } from '../store/initialState';
import { UsersType } from './types';

// userのアクションを呼ぶReducer
export const UsersReducer = (
  state = initialState.users,
  action: UsersType["action"]
) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        ...action.payload
      }
    case "SIGN_OUT":
      return {
        ...state,
        ...action.payload
      }
    default:
    // console.error(`type is ${Object.values(ACTION_TYPE).join(' or ')}`);
    // throw new Error(`type is ${Object.values(ACTION_TYPE).join(' or ')}`);
    return state;
  }
}