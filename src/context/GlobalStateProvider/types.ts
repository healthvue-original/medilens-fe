import { User } from "@/services/api/models";
import { Dispatch } from "react";

export type Payload = {
  [key: string]: any;
};

export type Action = {
  type: string;
  payload: Payload;
};

// --------- User Reducer ------------

export type UserAction<T> = {
  type: string;
  payload: T;
};

export type SetUser = {
  userData: User;
};

export type UserActionsList = UserAction<SetUser>;

export type UserActionsTypes = {
  setUser: (userData: User) => UserAction<SetUser>;
};

// --------- User State Ends ------------

export type GlobalState = {
  user: User;
};

export type StateContext = {
  state: GlobalState;
  dispatch: Dispatch<Action>;
};
