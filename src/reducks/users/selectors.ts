import {createSelector} from "reselect";
import { RootStateType } from "./types";

const usersSelector = (state:RootStateType) => state.users;

export const getUserId = createSelector(
  [usersSelector],
  state => state.uid
)

export const getUsername = createSelector(

  [usersSelector],
  state => state.username
)