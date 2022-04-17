import {createSelector} from "reselect";
import { RootStateType } from "./types";

const usersSelector = (state:RootStateType) => state.users;

export const getUserId = createSelector(
  [usersSelector],
  state => state.userId
)

export const getUserName = createSelector(

  [usersSelector],
  state => state.userName
)